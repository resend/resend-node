import type { Response } from '../interfaces';

export interface PaginatedData<T> {
  object: 'list';
  has_more: boolean;
  data: T[];
}

export interface PaginationOptions {
  limit?: number;
  after?: string;
  before?: string;
}

export class PaginatedRequest<T extends { id: string }>
  implements PromiseLike<Response<PaginatedData<T>>>
{
  private readonly fetchPage: (
    options: PaginationOptions,
  ) => Promise<Response<PaginatedData<T>>>;
  private initialOptions: PaginationOptions;
  private initialPagePromise: Promise<Response<PaginatedData<T>>>;

  constructor(
    fetchPage: (
      options: PaginationOptions,
    ) => Promise<Response<PaginatedData<T>>>,
    options: PaginationOptions = {},
  ) {
    this.initialPagePromise = fetchPage(options);
    this.fetchPage = fetchPage;
    this.initialOptions = options;
  }

  // biome-ignore lint/suspicious/noThenProperty: This class implements PromiseLike
  then<TResult1 = Response<PaginatedData<T>>, TResult2 = never>(
    onfulfilled?:
      | ((
          value: Response<PaginatedData<T>>,
        ) => TResult1 | PromiseLike<TResult1>)
      | null
      | undefined,
    onrejected?:
      // biome-ignore lint/suspicious/noExplicitAny: This is the standard PromiseLike signature
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | null
      | undefined,
  ): PromiseLike<TResult1 | TResult2> {
    return this.initialPagePromise.then(onfulfilled, onrejected);
  }

  private advanceCursor(
    items: T[],
    options: PaginationOptions,
  ): PaginationOptions {
    if (items.length === 0) {
      return options;
    }

    if (options.before) {
      // If we're paginating backwards, use the first item's ID as the 'before' cursor
      return {
        ...options,
        before: items[0].id,
        after: undefined,
      };
    }
    const lastItem = items[items.length - 1];
    return {
      ...options,
      after: lastItem.id,
      before: undefined,
    };
  }

  /**
   * Returns an async iterator that automatically handles pagination
   * and yields individual items from all pages
   */
  async *iterate(): AsyncIterableIterator<T> {
    const initialPage = await this.initialPagePromise;
    if (initialPage.error) {
      if (initialPage.error.name === 'rate_limit_exceeded') {
        // if first request was rate limited, wait and continue
        // we'll enter the pagination loop without advancing the cursor
        const retryAfter = initialPage.error.retryAfter * 1000;
        await new Promise((resolve) => {
          setTimeout(resolve, retryAfter);
        });
      } else {
        // TODO: how do we expose this error to the caller?
        console.error('Error fetching initial page:', initialPage.error);
        return;
      }
    } else {
      const items = initialPage.data.data;
      for (const item of items) {
        yield item;
      }

      if (!initialPage.data.has_more || items.length === 0) {
        return;
      }

      this.initialOptions = this.advanceCursor(items, this.initialOptions);
    }

    // Start iterating through subsequent pages
    let currentOptions = { ...this.initialOptions };
    let hasMore = true;

    while (hasMore) {
      const response = await this.fetchPageWithRetry(currentOptions);
      if (response.error) {
        // TODO: how do we expose this error to the caller?
        console.error('Error fetching page:', response.error);
        break;
      }

      const items = response.data.data;
      for (const item of items) {
        yield item;
      }

      hasMore = response.data.has_more;

      if (hasMore && items.length > 0) {
        currentOptions = this.advanceCursor(items, currentOptions);
      }
    }
  }

  /**
   * Fetches a page with automatic retry logic for rate limits
   */
  private async fetchPageWithRetry(
    options: PaginationOptions,
  ): Promise<Response<PaginatedData<T>>> {
    const response = await this.fetchPage(options);

    if (
      response.error?.name === 'rate_limit_exceeded' &&
      response.error.retryAfter
    ) {
      const retryAfter = response.error.retryAfter * 1000;
      await new Promise((resolve) => setTimeout(resolve, retryAfter));

      // Retry the same request
      return this.fetchPageWithRetry(options);
    }

    return response;
  }

  /**
   * Collects all items from all pages into a single array
   */
  async toArray(): Promise<T[]> {
    const items: T[] = [];
    for await (const item of this.iterate()) {
      items.push(item);
    }

    return items;
  }
}
