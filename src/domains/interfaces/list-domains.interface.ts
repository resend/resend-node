import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Domain } from './domain';

export type ListDomainsOptions = PaginationOptions;

export type ListDomainsResponseSuccess = {
  data: Domain[];
  object: 'list';
  has_more: boolean;
};

export type ListDomainsResponse = Response<ListDomainsResponseSuccess>;
