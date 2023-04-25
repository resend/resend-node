import { PostOptions } from '../../common/interfaces';

export interface CreateApiKeyOptions {
  name: string;
  permission?: 'full_access' | 'sending_access';
  domain_id?: string;
}

export interface CreateApiKeyRequestOptions extends PostOptions {}

export interface CreateApiKeyResponse {
  token: string;
  id: string;
}
