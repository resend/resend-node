import { ErrorResponse } from '../../interfaces';
import { Domain } from './domain';

export type RemoveDomainsResponseSuccess = Pick<Domain, 'id'>;

export interface RemoveDomainsResponse {
  data: RemoveDomainsResponseSuccess | null;
  error: ErrorResponse | null;
}
