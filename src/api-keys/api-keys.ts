import { Resend } from '../resend';
import {
  CreateApiKeyOptions,
  CreateApiKeyRequestOptions,
  CreateApiKeyResponse,
  CreateApiKeyResponseSuccess,
  ListApiKeysResponse,
  ListApiKeysResponseSuccess,
  RemoveApiKeyResponse,
  RemoveApiKeyResponseSuccess,
} from './interfaces';

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

  async list(): Promise<ListApiKeysResponse> {
    const data =
      await this.resend.get<ListApiKeysResponseSuccess[]>('/api-keys');
    return data;
  }

  async remove(id: string): Promise<RemoveApiKeyResponse> {
    const data = await this.resend.delete<RemoveApiKeyResponseSuccess>(
      `/api-keys/${id}`,
    );
    return data;
  }
}
