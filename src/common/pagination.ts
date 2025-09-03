import type { Response } from '../interfaces';

export type PageResponse<T> = Response<{
  object: 'list';
  data: Array<T>;
  has_more: boolean;
}>;

export type PageRequestOptions = {
  limit?: number;
} & ({ after?: string; before?: never } | { before?: string; after?: never });

export class PaginatedRequest<T extends { id: string }>
  implements Promise<PageResponse<T>>, AsyncIterable<PageResponse<T>>
{
  private readonly initialPagePromise: Promise<PageResponse<T>>;

  constructor(
    private readonly fetchPage: (
      options: PageRequestOptions,
    ) => Promise<PageResponse<T>>,
    private readonly options: PageRequestOptions,
  ) {
    this.initialPagePromise = fetchPage(options);
  }

  // biome-ignore lint/suspicious/noThenProperty: this class implements Promise
  then<TResult1 = PageResponse<T>, TResult2 = never>(
    onfulfilled?:
      | ((value: PageResponse<T>) => TResult1 | PromiseLike<TResult1>)
      | null
      | undefined,
    onrejected?:
      | ((reason: unknown) => TResult2 | PromiseLike<TResult2>)
      | null
      | undefined,
  ): Promise<TResult1 | TResult2> {
    return this.initialPagePromise.then(onfulfilled, onrejected);
  }

  catch<TResult = never>(
    onrejected?:
      | ((reason: unknown) => TResult | PromiseLike<TResult>)
      | null
      | undefined,
  ): Promise<PageResponse<T> | TResult> {
    return this.initialPagePromise.catch(onrejected);
  }

  finally(
    onfinally?: (() => void) | null | undefined,
  ): Promise<PageResponse<T>> {
    return this.initialPagePromise.finally(onfinally);
  }

  [Symbol.toStringTag] = 'PaginatedRequest';

  private async getPageRetryingRateLimit(
    firstWait: number,
    options: PageRequestOptions,
  ): Promise<PageResponse<T>> {
    if (firstWait > 0) {
      await sleep(firstWait);
    }

    let page = await this.fetchPage(options);
    while (page.error?.name === 'rate_limit_exceeded') {
      const retryAfter = page.error.retryAfter;
      await sleep(retryAfter);
      page = await this.fetchPage(options);
    }

    return page;
  }

  private async *iterator(): AsyncIterator<PageResponse<T>> {
    let page = await this.initialPagePromise;
    if (page.error?.name === 'rate_limit_exceeded') {
      page = await this.getPageRetryingRateLimit(
        page.error.retryAfter,
        this.options,
      );
    }
    yield page;

    const options = { ...this.options };
    while (page.data?.has_more && page.data.data.length > 0) {
      if (options.before) {
        options.before = page.data.data[0].id;
      } else {
        options.after = page.data.data[page.data.data.length - 1].id;
      }

      page = await this.getPageRetryingRateLimit(0, options);
      yield page;
    }
  }

  [Symbol.asyncIterator](): AsyncIterator<PageResponse<T>> {
    return this.iterator();
  }
}

async function sleep(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
