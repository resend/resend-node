import { AxiosResponse } from 'axios';
import { Resend } from '../resend';
import {
  CreateApiKeyOptions,
  CreateApiKeyRequestOptions,
  CreateApiKeyResponse,
} from './interfaces';

export class ApiKeys {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateApiKeyOptions,
    options: CreateApiKeyRequestOptions = {},
  ): Promise<CreateApiKeyResponse> {
    const data = await this.resend.post<CreateApiKeyResponse>(
      '/api-keys',
      payload,
      options,
    );
    return data;
  }

  async list(): Promise<void> {
    const { data } = await this.resend.get<AxiosResponse>('/api-keys');
    return data;
  }

  async remove(id: string) {
    await this.resend.delete(`/api-keys/${id}`);
  }
}
