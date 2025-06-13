import type { ErrorResponse } from '../../interfaces';
import type { ApiKey } from './api-key';

export type ListApiKeysResponseSuccess = Pick<
  ApiKey,
  'name' | 'id' | 'created_at'
>[];

export type ListApiKeysResponse =
  | {
      data: ListApiKeysResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
