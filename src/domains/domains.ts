import type { RequestOptions } from '../common/interfaces/request-options.interface';
import { buildPaginationUrl } from '../common/utils/build-pagination-query';
import { parseDomainToApiOptions } from '../common/utils/parse-domain-to-api-options';
import { path } from '../common/utils/path';
import type { Resend } from '../resend';
import { DomainClaims } from './claims/domain-claims';
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
  ListDomainsOptions,
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
  readonly claims: DomainClaims;

  constructor(private readonly resend: Resend) {
    this.claims = new DomainClaims(this.resend);
  }

  async create(
    payload: CreateDomainOptions,
    requestOptions: CreateDomainRequestOptions = {},
  ): Promise<CreateDomainResponse> {
    const data = await this.resend.post<CreateDomainResponseSuccess>(
      '/domains',
      parseDomainToApiOptions(payload),
      requestOptions,
    );
    return data;
  }

  async list(
    options: ListDomainsOptions = {},
    requestOptions: RequestOptions = {},
  ): Promise<ListDomainsResponse> {
    const url = buildPaginationUrl('/domains', options);

    const data = await this.resend.get<ListDomainsResponseSuccess>(
      url,
      requestOptions,
    );
    return data;
  }

  async get(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<GetDomainResponse> {
    const data = await this.resend.get<GetDomainResponseSuccess>(
      path`/domains/${id}`,
      requestOptions,
    );

    return data;
  }

  async update(
    payload: UpdateDomainsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateDomainsResponse> {
    const data = await this.resend.patch<UpdateDomainsResponseSuccess>(
      path`/domains/${payload.id}`,
      {
        click_tracking: payload.clickTracking,
        open_tracking: payload.openTracking,
        tls: payload.tls,
        capabilities: payload.capabilities,
        tracking_subdomain: payload.trackingSubdomain,
      },
      requestOptions,
    );
    return data;
  }

  async remove(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveDomainsResponse> {
    const data = await this.resend.delete<RemoveDomainsResponseSuccess>(
      path`/domains/${id}`,
      undefined,
      requestOptions,
    );
    return data;
  }

  async verify(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<VerifyDomainsResponse> {
    const data = await this.resend.post<VerifyDomainsResponseSuccess>(
      path`/domains/${id}/verify`,
      undefined,
      requestOptions,
    );
    return data;
  }
}
