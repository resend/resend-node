import type { ErrorResponse } from '../../interfaces';
import type { Domain } from './domain';

export type ListDomainsResponseSuccess = { data: Domain[] };

export type ListDomainsResponse =
  | {
      data: ListDomainsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
