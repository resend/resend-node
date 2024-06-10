import type { ErrorResponse } from '../../interfaces';
import type { ApiKey } from './api-key';

export type ListApiKeysResponseSuccess = Pick<
  ApiKey,
  'name' | 'id' | 'created_at'
>[];

export interface ListApiKeysResponse {
  data: ListApiKeysResponseSuccess | null;
  error: ErrorResponse | null;
}
