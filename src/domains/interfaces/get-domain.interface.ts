import type { Response } from '../../interfaces';
import type { Domain, DomainRecords } from './domain';

export interface GetDomainResponseSuccess
  extends Pick<Domain, 'id' | 'name' | 'created_at' | 'region' | 'status'> {
  object: 'domain';
  records: DomainRecords[];
}

export type GetDomainResponse = Response<GetDomainResponseSuccess>;
