import type { Response } from '../../interfaces';
import type { Domain, DomainCapabilities } from './domain';

export interface UpdateDomainsOptions {
  id: string;
  clickTracking?: boolean;
  openTracking?: boolean;
  tls?: 'enforced' | 'opportunistic';
  capabilities?: Partial<DomainCapabilities>;
}

export type UpdateDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
};

export type UpdateDomainsResponse = Response<UpdateDomainsResponseSuccess>;
