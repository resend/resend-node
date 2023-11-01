import { Resend } from '../resend';
import {
  CreateDomainOptions,
  CreateDomainRequestOptions,
  CreateDomainResponse,
  CreateDomainResponseSuccess,
  GetDomainResponse,
  GetDomainResponseSuccess,
  ListDomainsResponse,
  ListDomainsResponseSuccess,
  RemoveDomainsResponse,
  RemoveDomainsResponseSuccess,
  VerifyDomainsResponse,
  VerifyDomainsResponseSuccess,
} from './interfaces';

export class Domains {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateDomainOptions,
    options: CreateDomainRequestOptions = {},
  ): Promise<CreateDomainResponse> {
    const data = await this.resend.post<CreateDomainResponseSuccess>(
      '/domains',
      payload,
      options,
    );
    return data;
  }

  async list(): Promise<ListDomainsResponse> {
    const data = await this.resend.get<ListDomainsResponseSuccess>('/domains');
    return data;
  }

  async get(id: string): Promise<GetDomainResponse> {
    const data = await this.resend.get<GetDomainResponseSuccess>(
      `/domains/${id}`,
    );
    return data;
  }

  async remove(id: string): Promise<RemoveDomainsResponse> {
    const data = await this.resend.delete<RemoveDomainsResponseSuccess>(
      `/domains/${id}`,
    );
    return data;
  }

  async verify(id: string): Promise<VerifyDomainsResponse> {
    const data = await this.resend.post<VerifyDomainsResponseSuccess>(
      `/domains/${id}/verify`,
    );
    return data;
  }
}
