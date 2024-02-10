import { ErrorResponse } from '../../interfaces';
import { Domain } from './domain';

export interface PatchDomainsOptions {
  id: string;
  click_tracking?: boolean;
  open_tracking?: boolean;
}

export type PatchDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
};

export interface PatchDomainsResponse {
  data: PatchDomainsResponseSuccess | null;
  error: ErrorResponse | null;
}
