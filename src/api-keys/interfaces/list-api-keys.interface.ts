import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { ApiKey } from './api-key';

export type ListApiKeysOptions = PaginationOptions;

export type ListApiKeysResponseSuccess = {
  object: 'list';
  has_more: boolean;
  data: Pick<ApiKey, 'name' | 'id' | 'created_at'>[];
};

export type ListApiKeysResponse = Response<ListApiKeysResponseSuccess>;
