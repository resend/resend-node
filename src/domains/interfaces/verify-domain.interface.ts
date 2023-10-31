import { ErrorResponse } from '../../interfaces';
import { Domain } from './domain';

export type VerifyDomainsResponseSuccess = Domain[];

export interface VerifyDomainsResponse {
  data: VerifyDomainsResponseSuccess | null;
  error: ErrorResponse | null;
}
