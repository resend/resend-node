import type { Response } from '../../interfaces';
import type { Domain, DomainCapabilities } from './domain';
import type { TrackingDomains } from '../tracking-domains/tracking-domains';

export interface UpdateDomainsOptions {
  id: string;
  /** @deprecated Use {@link TrackingDomains.update} instead */
  clickTracking?: boolean;
  /** @deprecated Use {@link TrackingDomains.update} instead */
  openTracking?: boolean;
  tls?: 'enforced' | 'opportunistic';
  capabilities?: Partial<DomainCapabilities>;
}

export type UpdateDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
};

export type UpdateDomainsResponse = Response<UpdateDomainsResponseSuccess>;
