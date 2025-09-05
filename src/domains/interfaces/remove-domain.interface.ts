import type { ErrorResponse } from '../../interfaces';
import type { Domain } from './domain';

export type RemoveDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
  deleted: boolean;
};

export type RemoveDomainsResponse =
  | {
      data: RemoveDomainsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
