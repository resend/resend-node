import { PostOptions } from '../../common/interfaces';

export type DomainRegion = 'us-east-1' | 'eu-west-1' | 'sa-east-1';

export interface CreateDomainOptions {
  domain: string;
  region?: DomainRegion;
}

export interface CreateDomainRequestOptions extends PostOptions {}

export type DomainNameservers =
  | 'Amazon Route 53'
  | 'Cloudflare'
  | 'Digital Ocean'
  | 'GoDaddy'
  | 'Google Domains'
  | 'Namecheap'
  | 'Unidentified'
  | 'Vercel';

export type DomainStatus =
  | 'pending'
  | 'verified'
  | 'failed'
  | 'temporary_failure'
  | 'not_started';

export interface DomainSpfRecord {
  record: 'SPF';
  name: string;
  value: string;
  type: 'MX' | 'TXT';
  ttl: string;
  status: DomainStatus;
  routingPolicy?: string;
  priority?: number;
  proxStatus?: 'enable' | 'disable';
}

export interface DomainDkimRecord {
  record: 'DKIM';
  name: string;
  value: string;
  type: 'CNAME';
  ttl: string;
  status: DomainStatus;
  routingPolicy?: string;
  priority?: number;
  proxStatus?: 'enable' | 'disable';
}

export type CreateDomainResponse = {
  name: string;
  id: string;
  dnsProvider: DomainNameservers;
  status: DomainStatus;
  createdAt: string;
  records: (DomainSpfRecord | DomainDkimRecord)[];
  region: DomainRegion;
};
