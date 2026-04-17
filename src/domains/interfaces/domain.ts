export type DomainRegion =
  | 'us-east-1'
  | 'eu-west-1'
  | 'sa-east-1'
  | 'ap-northeast-1';

export type DomainCapabilityStatus = 'enabled' | 'disabled';

export interface DomainCapabilities {
  sending: DomainCapabilityStatus;
  receiving: DomainCapabilityStatus;
}

export type DomainNameservers =
  | 'Amazon Route 53'
  | 'Cloudflare'
  | 'Digital Ocean'
  | 'GoDaddy'
  | 'Google Domains'
  | 'Namecheap'
  | 'Unidentified'
  | 'Vercel';

export type DomainRecordStatus =
  | 'pending'
  | 'verified'
  | 'failed'
  | 'not_started'
  | 'partially_verified'
  | 'partially_failed';

export type DomainRecordStatus =
  | 'pending'
  | 'verified'
  | 'failed'
  | 'temporary_failure'
  | 'not_started';

export type DomainStatus =
  | DomainRecordStatus
  | 'partially_verified'
  | 'partially_failed';

export type DomainRecords =
  | DomainSpfRecord
  | DomainDkimRecord
  | ReceivingRecord
  | TrackingRecord
  | TrackingCaaRecord;

export interface DomainSpfRecord {
  record: 'SPF';
  name: string;
  value: string;
  type: 'MX' | 'TXT';
  ttl: string;
  status: DomainRecordStatus;
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
  status: DomainRecordStatus;
  routing_policy?: string;
  priority?: number;
  proxy_status?: 'enable' | 'disable';
}

export interface ReceivingRecord {
  record: 'Receiving';
  name: string;
  value: string;
  type: 'MX';
  ttl: string;
  status: DomainRecordStatus;
  priority: number;
}

export interface TrackingRecord {
  record: 'Tracking';
  name: string;
  value: string;
  type: 'CNAME';
  ttl: string;
  status: DomainRecordStatus;
}

export interface TrackingCaaRecord {
  record: 'TrackingCAA';
  name: string;
  value: string;
  type: 'CAA';
  ttl: string;
  status: DomainRecordStatus;
}

export interface Domain {
  id: string;
  name: string;
  status: DomainStatus;
  created_at: string;
  region: DomainRegion;
  capabilities: DomainCapabilities;
  open_tracking?: boolean;
  click_tracking?: boolean;
  tracking_subdomain?: string;
}
