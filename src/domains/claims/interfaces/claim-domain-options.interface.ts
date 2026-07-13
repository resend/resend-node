import type { PostOptions } from '../../../common/interfaces/post-option.interface';
import type { Response } from '../../../interfaces';
import type { DomainRegion } from '../../interfaces/domain';
import type { DomainClaim } from './domain-claim';

export interface ClaimDomainOptions {
  name: string;
  region?: DomainRegion;
  customReturnPath?: string;
  openTracking?: boolean;
  clickTracking?: boolean;
  trackingSubdomain?: string;
}

export interface ClaimDomainRequestOptions extends PostOptions {}

export interface ClaimDomainResponseSuccess extends DomainClaim {
  object: 'domain_claim';
}

export type ClaimDomainResponse = Response<ClaimDomainResponseSuccess>;
