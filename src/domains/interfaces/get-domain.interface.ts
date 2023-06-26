import { DomainRecords, DomainRegion, DomainStatus } from './domain';

export type GetDomainResponse = {
  object: 'domain';
  id: string;
  name: string;
  created_at: string;
  region: DomainRegion;
  status: DomainStatus;
  records: DomainRecords[];
};
