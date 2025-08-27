import type { PaginationOptions } from '../interfaces/pagination';

export function createPaginationQuery<
  T extends PaginationOptions<IdType>,
  IdType,
>(options: T): Record<string, string | number | IdType | undefined> {
  return {
    limit: options.limit,
    after: 'after' in options ? options.after : undefined,
    before: 'before' in options ? options.before : undefined,
  };
}
