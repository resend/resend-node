import type { Response } from '../../interfaces';
import type { ApiKey } from './api-key';

export type RemoveApiKeyResponseSuccess = Pick<ApiKey, 'id'> & {
  object: 'api_key';
  deleted: boolean;
};

export type RemoveApiKeyResponse = Response<RemoveApiKeyResponseSuccess>;
