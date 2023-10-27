import { ErrorResponse } from '../../interfaces';
import { DomainRecords, DomainRegion, DomainStatus } from './domain';

interface GetDomainResponseSuccess {
  object: 'domain';
  id: string;
  name: string;
  created_at: string;
  region: DomainRegion;
  status: DomainStatus;
  records: DomainRecords[];
}

export type GetDomainResponse = GetDomainResponseSuccess | ErrorResponse;
