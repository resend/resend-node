import { DomainRegion, DomainStatus } from './domain';

export type ListDomainsResponse = {
  data: {
    name: string;
    id: string;
    created_at: string;
    region: DomainRegion;
    status: DomainStatus;
  }[];
};
