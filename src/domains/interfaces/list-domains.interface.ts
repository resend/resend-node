import type { Response } from '../../interfaces';
import type { Domain } from './domain';

export type ListDomainsResponseSuccess = { data: Domain[] };

export type ListDomainsResponse = Response<ListDomainsResponseSuccess>;
