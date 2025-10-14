import type { PaginationOptions } from '../interfaces';

export function getPaginationQueryProperties(
  options: PaginationOptions = {},
): string {
  const query = new URLSearchParams();

  if (options.before) query.set('before', options.before);
  if (options.after) query.set('after', options.after);
  if (options.limit) query.set('limit', options.limit.toString());

  return query.size > 0 ? `?${query.toString()}` : '';
}
