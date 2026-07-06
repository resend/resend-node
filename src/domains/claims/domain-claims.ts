import type { Resend } from '../../resend';
import type {
  ClaimDomainOptions,
  ClaimDomainRequestOptions,
  ClaimDomainResponse,
  ClaimDomainResponseSuccess,
} from './interfaces/claim-domain-options.interface';
import type {
  GetDomainClaimResponse,
  GetDomainClaimResponseSuccess,
} from './interfaces/get-domain-claim.interface';
import type {
  VerifyDomainClaimResponse,
  VerifyDomainClaimResponseSuccess,
} from './interfaces/verify-domain-claim.interface';

export class DomainClaims {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: ClaimDomainOptions,
    options: ClaimDomainRequestOptions = {},
  ): Promise<ClaimDomainResponse> {
    const data = await this.resend.post<ClaimDomainResponseSuccess>(
      '/domains/claim',
      {
        name: payload.name,
        region: payload.region,
        custom_return_path: payload.customReturnPath,
        open_tracking: payload.openTracking,
        click_tracking: payload.clickTracking,
        tracking_subdomain: payload.trackingSubdomain,
      },
      options,
    );
    return data;
  }

  async get(domainId: string): Promise<GetDomainClaimResponse> {
    const data = await this.resend.get<GetDomainClaimResponseSuccess>(
      `/domains/${domainId}/claim`,
    );
    return data;
  }

  async verify(domainId: string): Promise<VerifyDomainClaimResponse> {
    const data = await this.resend.post<VerifyDomainClaimResponseSuccess>(
      `/domains/${domainId}/claim/verify`,
    );
    return data;
  }
}
