import type { ErrorResponse } from '../../interfaces';
import type { Domain } from './domain';

export interface UpdateDomainsOptions {
  id: string;
  clickTracking?: boolean;
  openTracking?: boolean;
  tls?: 'enforced' | 'opportunistic';
}

export type UpdateDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
};

export type UpdateDomainsResponse =
  | {
      data: UpdateDomainsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
