import { PostOptions } from '../../common/interfaces';

export interface CreateApiKeyOptions {
  name: string;
}

export interface CreateApiKeyRequestOptions extends PostOptions {}

export interface CreateApiKeyResponse {
  token: string;
}
