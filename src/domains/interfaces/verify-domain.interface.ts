import type { Response } from '../../interfaces';
import type { Domain } from './domain';

export type VerifyDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
};

export type VerifyDomainsResponse = Response<VerifyDomainsResponseSuccess>;
