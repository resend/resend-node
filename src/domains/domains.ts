import { Resend } from '../resend';
import {
  CreateDomainOptions,
  CreateDomainRequestOptions,
  CreateDomainResponse,
  GetDomainResponse,
  ListDomainsResponse,
} from './interfaces';

export class Domains {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateDomainOptions,
    options: CreateDomainRequestOptions = {},
  ): Promise<CreateDomainResponse> {
    const data = await this.resend.post<CreateDomainResponse>(
      '/domains',
      payload,
      options,
    );
    return data;
  }

  async list(): Promise<ListDomainsResponse> {
    const data = await this.resend.get<ListDomainsResponse>('/domains');
    return data;
  }

  async get(id: string): Promise<GetDomainResponse> {
    const data = await this.resend.get<GetDomainResponse>(`/domains/${id}`);
    return data;
  }

  async remove(id: string) {
    await this.resend.delete(`/domains/${id}`);
  }

  async verify(id: string) {
    await this.resend.post(`/domains/${id}/verify`);
  }
}
