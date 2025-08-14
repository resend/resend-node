import type { Response } from '../../interfaces';
import type { ApiKey } from './api-key';

export type ListApiKeysResponseSuccess = Pick<
  ApiKey,
  'name' | 'id' | 'created_at'
>[];

export type ListApiKeysResponse = Response<ListApiKeysResponseSuccess>;
