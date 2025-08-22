export interface List<T> {
  readonly object: 'list';
  data: T[];
}

export interface PaginatedList<T> extends List<T> {
  has_more: boolean;
}

export interface PaginationOptions {
  before?: string | null;
  after?: string | null;
  limit?: number | null;
}
