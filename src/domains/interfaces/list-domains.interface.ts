import type { PaginationOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';
import type { Domain } from './domain';

export type ListDomainsOptions = PaginationOptions;

export type ListDomainsResponseSuccess = {
  data: Domain[];
  object: 'list';
  has_more: boolean;
};

export type ListDomainsResponse =
  | {
      data: ListDomainsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
