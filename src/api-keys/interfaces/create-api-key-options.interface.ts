import { PostOptions } from '../../common/interfaces';

export interface CreateApiKeyOptions {
  name: string;
  scope?: 'full_access' | 'sending_only';
  domain_id?: string;
}

export interface CreateApiKeyRequestOptions extends PostOptions {}

export interface CreateApiKeyResponse {
  token: string;
}
