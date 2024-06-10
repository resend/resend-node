import type { ErrorResponse } from '../../interfaces';
import type { Domain } from './domain';

export type VerifyDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
};

export interface VerifyDomainsResponse {
  data: VerifyDomainsResponseSuccess | null;
  error: ErrorResponse | null;
}
