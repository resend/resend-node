import { parseDomainToApiOptions } from '../common/utils/parse-domain-to-api-options';
import type { Resend } from '../resend';
import type {
  CreateDomainOptions,
  CreateDomainRequestOptions,
  CreateDomainResponse,
  CreateDomainResponseSuccess,
} from './interfaces/create-domain-options.interface';
import type {
  GetDomainResponse,
  GetDomainResponseSuccess,
} from './interfaces/get-domain.interface';
import type {
  ListDomainsResponse,
  ListDomainsResponseSuccess,
} from './interfaces/list-domains.interface';
import type {
  RemoveDomainsResponse,
  RemoveDomainsResponseSuccess,
} from './interfaces/remove-domain.interface';
import type {
  UpdateDomainsOptions,
  UpdateDomainsResponse,
  UpdateDomainsResponseSuccess,
} from './interfaces/update-domain.interface';
import type {
  VerifyDomainsResponse,
  VerifyDomainsResponseSuccess,
} from './interfaces/verify-domain.interface';

export class Domains {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateDomainOptions,
    options: CreateDomainRequestOptions = {},
  ): Promise<CreateDomainResponse> {
    const data = await this.resend.post<CreateDomainResponseSuccess>(
      '/domains',
      parseDomainToApiOptions(payload),
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

  async update(payload: UpdateDomainsOptions): Promise<UpdateDomainsResponse> {
    const data = await this.resend.patch<UpdateDomainsResponseSuccess>(
      `/domains/${payload.id}`,
      {
        click_tracking: payload.clickTracking,
        open_tracking: payload.openTracking,
        tls: payload.tls,
      },
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
