import { PostOptions } from '../../common/interfaces';

export interface CreateApiKeyOptions {
  name: string;
  access?: 'full_access' | 'sending_only_access';
  domain_id?: string;
}

export interface CreateApiKeyRequestOptions extends PostOptions {}

export interface CreateApiKeyResponse {
  token: string;
}
