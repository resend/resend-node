import type { Response } from '../../../interfaces';
import type { DomainClaim } from './domain-claim';

export interface VerifyDomainClaimResponseSuccess extends DomainClaim {
  object: 'domain_claim';
}

export type VerifyDomainClaimResponse =
  Response<VerifyDomainClaimResponseSuccess>;
