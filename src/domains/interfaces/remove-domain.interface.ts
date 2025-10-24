import type { Response } from '../../interfaces';
import type { Domain } from './domain';

export type RemoveDomainsResponseSuccess = Pick<Domain, 'id'> & {
  object: 'domain';
  deleted: boolean;
};

export type RemoveDomainsResponse = Response<RemoveDomainsResponseSuccess>;
