import type { Response } from '../../interfaces';
import type { Domain, DomainCapabilities } from './domain';

export interface UpdateDomainsOptions {
  id: string;
  /** @deprecated Use tracking domains instead: `resend.domains.tracking.update()` */
  clickTracking?: boolean;
  /** @deprecated Use tracking domains instead: `resend.domains.tracking.update()` */
  openTracking?: boolean;
  tls?: 'enforced' | 'opportunistic';
  capabilities?: Partial<DomainCapabilities>;
}

export type UpdateDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
};

export type UpdateDomainsResponse = Response<UpdateDomainsResponseSuccess>;
