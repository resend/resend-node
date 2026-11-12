import type { Response } from '../../interfaces';
import type { Domain, DomainCapabilities } from './domain';

export interface UpdateDomainsOptions {
  id: string;
  clickTracking?: boolean;
  openTracking?: boolean;
  tls?: 'enforced' | 'opportunistic';
  capabilities?: Partial<DomainCapabilities>;
  trackingSubdomain?: string;
  /**
   * Move the domain's Forge return path to another host. Only possible while
   * the Forge record is still verifying. Moving the path does not start
   * verification: fetch the new record with `domains.get`, add it to your DNS,
   * then call `domains.verify` with `scope: ['forge']`.
   */
  forgeReturnPath?: string;
}

export type UpdateDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
};

export type UpdateDomainsResponse = Response<UpdateDomainsResponseSuccess>;
