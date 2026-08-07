import { buildPaginationUrl } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
import type {
  CreateApiKeyOptions,
  CreateApiKeyRequestOptions,
  CreateApiKeyResponse,
  CreateApiKeyResponseSuccess,
} from './interfaces/create-api-key-options.interface';
import type {
  ListApiKeysOptions,
  ListApiKeysResponse,
  ListApiKeysResponseSuccess,
} from './interfaces/list-api-keys.interface';
import type {
  RemoveApiKeyResponse,
  RemoveApiKeyResponseSuccess,
} from './interfaces/remove-api-keys.interface';

export class ApiKeys {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateApiKeyOptions,
    options: CreateApiKeyRequestOptions = {},
  ): Promise<CreateApiKeyResponse> {
    const data = await this.resend.post<CreateApiKeyResponseSuccess>(
      '/api-keys',
      payload,
      options,
    );

    return data;
  }

  async list(options: ListApiKeysOptions = {}): Promise<ListApiKeysResponse> {
    const url = buildPaginationUrl('/api-keys', options);

    const data = await this.resend.get<ListApiKeysResponseSuccess>(url);
    return data;
  }

  async remove(id: string): Promise<RemoveApiKeyResponse> {
    const data = await this.resend.delete<RemoveApiKeyResponseSuccess>(
      `/api-keys/${id}`,
    );
    return data;
  }
}
