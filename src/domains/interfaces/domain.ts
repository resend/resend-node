export type DomainRegion = 'us-east-1' | 'eu-west-1' | 'sa-east-1';

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

export type DomainRecords = DomainSpfRecord | DomainDkimRecord;

export interface DomainSpfRecord {
  record: 'SPF';
  name: string;
  value: string;
  type: 'MX' | 'TXT';
  ttl: string;
  status: DomainStatus;
  routing_policy?: string;
  priority?: number;
  proxy_status?: 'enable' | 'disable';
}

export interface DomainDkimRecord {
  record: 'DKIM';
  name: string;
  value: string;
  type: 'CNAME' | 'TXT';
  ttl: string;
  status: DomainStatus;
  routing_policy?: string;
  priority?: number;
  proxy_status?: 'enable' | 'disable';
}

export interface Domain {
  id: string;
  name: string;
  status: DomainStatus;
  created_at: string;
  region: DomainRegion;
}
