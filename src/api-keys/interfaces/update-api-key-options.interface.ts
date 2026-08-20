import type { Response } from '../../interfaces';

export interface UpdateApiKeyOptions {
  name: string;
}

export interface UpdateApiKeyResponseSuccess {
  object: 'api_key';
  id: string;
}

export type UpdateApiKeyResponse = Response<UpdateApiKeyResponseSuccess>;
