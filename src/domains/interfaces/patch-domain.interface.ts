import { ErrorResponse } from '../../interfaces';
import { Domain } from './domain';

export interface PatchDomainsOptions {
  id: string;
  clickTracking?: boolean;
  openTracking?: boolean;
}

export type PatchDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
};

export interface PatchDomainsResponse {
  data: PatchDomainsResponseSuccess | null;
  error: ErrorResponse | null;
}
