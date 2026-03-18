import type { PaginationOptions } from '../interfaces/pagination-options.interface';

/**
 * Builds a query string from pagination options
 * @param options - Pagination options containing limit and either after or before (but not both)
 * @returns Query string (without leading '?') or empty string if no options
 */
export function buildPaginationQuery(options: PaginationOptions): string {
  const searchParams = new URLSearchParams();

  if (options.limit !== undefined) {
    searchParams.set('limit', options.limit.toString());
  }

  if ('after' in options && options.after !== undefined) {
    searchParams.set('after', options.after);
  }

  if ('before' in options && options.before !== undefined) {
    searchParams.set('before', options.before);
  }

  return searchParams.toString();
}
