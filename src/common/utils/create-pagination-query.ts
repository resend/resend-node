import type { PaginationOptions } from '../interfaces/pagination';

export function createPaginationQuery<
  T extends PaginationOptions<IdType>,
  IdType,
>(options: T = {} as T): Record<string, string | number | IdType | undefined> {
  return {
    limit: 'limit' in options ? options.limit : undefined,
    after: 'after' in options ? options.after : undefined,
    before: 'before' in options ? options.before : undefined,
  };
}
