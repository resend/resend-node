import { Resend } from '../resend';
import { CreateApiKeyOptions, CreateApiKeyRequestOptions } from './interfaces';

export class ApiKeys {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateApiKeyOptions,
    options: CreateApiKeyRequestOptions = {},
  ): Promise<void> {
    const { data } = await this.resend.post('/api-keys', payload, options);
    return data;
  }

  async list(): Promise<void> {
    const { data } = await this.resend.get('/api-keys');
    return data;
  }

  async remove(id: string) {
    await this.resend.delete(`/api-keys/${id}`);
  }
}
