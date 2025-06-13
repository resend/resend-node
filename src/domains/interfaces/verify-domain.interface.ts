import type { ErrorResponse } from '../../interfaces';
import type { Domain } from './domain';

export type VerifyDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
};

export type VerifyDomainsResponse =
  | {
      data: VerifyDomainsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
