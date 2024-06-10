import type { PostOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';

export interface CreateApiKeyOptions {
  name: string;
  permission?: 'full_access' | 'sending_access';
  domain_id?: string;
}

export interface CreateApiKeyRequestOptions extends PostOptions {}

export interface CreateApiKeyResponseSuccess {
  token: string;
  id: string;
}

export interface CreateApiKeyResponse {
  data: CreateApiKeyResponseSuccess | null;
  error: ErrorResponse | null;
}
