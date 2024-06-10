import type { ErrorResponse } from '../../interfaces';
import type { Domain } from './domain';

export type RemoveDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
  deleted: boolean;
};

export interface RemoveDomainsResponse {
  data: RemoveDomainsResponseSuccess | null;
  error: ErrorResponse | null;
}
