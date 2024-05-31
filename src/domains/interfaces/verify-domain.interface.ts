import { ErrorResponse } from '../../interfaces';
import { Domain } from './domain';

export type VerifyDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
};

export interface VerifyDomainsResponse {
  data: VerifyDomainsResponseSuccess | null;
  error: ErrorResponse | null;
}
