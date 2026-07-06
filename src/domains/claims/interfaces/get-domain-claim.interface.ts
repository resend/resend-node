import type { Response } from '../../../interfaces';
import type { DomainClaim } from './domain-claim';

export interface GetDomainClaimResponseSuccess extends DomainClaim {
  object: 'domain_claim';
}

export type GetDomainClaimResponse = Response<GetDomainClaimResponseSuccess>;
