import type { RequestOptions } from '../../common/interfaces/request-options.interface';
import type { Response } from '../../interfaces';
import type { Domain } from './domain';

export type VerifyDomainsScope = 'forge';

export interface VerifyDomainsOptions extends RequestOptions {
  /**
   * Limit the check to specific records. Pass `['forge']` to verify only the
   * Forge record and leave the other records untouched. Requires Forge to be
   * enabled on the domain. When omitted, all records are checked.
   */
  scope?: VerifyDomainsScope[];
}

export type VerifyDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
};

export type VerifyDomainsResponse = Response<VerifyDomainsResponseSuccess>;
