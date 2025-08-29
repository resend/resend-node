export type PaginationOptions<IdType> =
  | {
      limit?: number;
      after?: IdType;
      before?: never;
    }
  | {
      limit?: number;
      before?: IdType;
      after?: never;
    };

export type PaginatedData<Data> = {
  object: 'list';
  data: Data;
  hasMore: boolean;
};

export type PaginatedApiResponse<Data> = {
  object: 'list';
  data: Data;
  has_more: boolean;
};
