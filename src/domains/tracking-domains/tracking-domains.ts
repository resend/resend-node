import type { Resend } from '../../resend';
import type {
  CreateTrackingDomainOptions,
  CreateTrackingDomainRequestOptions,
  CreateTrackingDomainResponse,
  CreateTrackingDomainResponseSuccess,
} from './interfaces/create-tracking-domain-options.interface';
import type {
  GetTrackingDomainResponse,
  GetTrackingDomainResponseSuccess,
} from './interfaces/get-tracking-domain.interface';
import type {
  ListTrackingDomainsResponse,
  ListTrackingDomainsResponseSuccess,
} from './interfaces/list-tracking-domains.interface';
import type {
  RemoveTrackingDomainResponse,
  RemoveTrackingDomainResponseSuccess,
} from './interfaces/remove-tracking-domain.interface';
import type {
  UpdateTrackingDomainOptions,
  UpdateTrackingDomainResponse,
  UpdateTrackingDomainResponseSuccess,
} from './interfaces/update-tracking-domain.interface';
import type {
  VerifyTrackingDomainResponse,
  VerifyTrackingDomainResponseSuccess,
} from './interfaces/verify-tracking-domain.interface';

export class TrackingDomains {
  constructor(private readonly resend: Resend) {}

  async create(
    domainId: string,
    payload: CreateTrackingDomainOptions,
    options: CreateTrackingDomainRequestOptions = {},
  ): Promise<CreateTrackingDomainResponse> {
    return this.resend.post<CreateTrackingDomainResponseSuccess>(
      `/domains/${domainId}/tracking`,
      payload,
      options,
    );
  }

  async list(domainId: string): Promise<ListTrackingDomainsResponse> {
    return this.resend.get<ListTrackingDomainsResponseSuccess>(
      `/domains/${domainId}/tracking`,
    );
  }

  async get(
    domainId: string,
    trackingDomainId: string,
  ): Promise<GetTrackingDomainResponse> {
    return this.resend.get<GetTrackingDomainResponseSuccess>(
      `/domains/${domainId}/tracking/${trackingDomainId}`,
    );
  }

  async update(
    domainId: string,
    trackingDomainId: string,
    payload: UpdateTrackingDomainOptions,
  ): Promise<UpdateTrackingDomainResponse> {
    return this.resend.patch<UpdateTrackingDomainResponseSuccess>(
      `/domains/${domainId}/tracking/${trackingDomainId}`,
      payload,
    );
  }

  async remove(
    domainId: string,
    trackingDomainId: string,
  ): Promise<RemoveTrackingDomainResponse> {
    return this.resend.delete<RemoveTrackingDomainResponseSuccess>(
      `/domains/${domainId}/tracking/${trackingDomainId}`,
    );
  }

  async verify(
    domainId: string,
    trackingDomainId: string,
  ): Promise<VerifyTrackingDomainResponse> {
    return this.resend.post<VerifyTrackingDomainResponseSuccess>(
      `/domains/${domainId}/tracking/${trackingDomainId}/verify`,
    );
  }
}
