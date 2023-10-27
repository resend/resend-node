import { PostOptions } from '../../common/interfaces';
import { ErrorResponse } from '../../interfaces';
import { DomainRegion, DomainStatus } from './domain';

export interface CreateDomainOptions {
  name: string;
  region?: DomainRegion;
}

export interface CreateDomainRequestOptions extends PostOptions {}

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
  type: 'CNAME';
  ttl: string;
  status: DomainStatus;
  routing_policy?: string;
  priority?: number;
  proxy_status?: 'enable' | 'disable';
}

interface CreateDomainResponseSuccess {
  name: string;
  id: string;
  status: DomainStatus;
  created_at: string;
  records: (DomainSpfRecord | DomainDkimRecord)[];
  region: DomainRegion;
}

export type CreateDomainResponse = CreateDomainResponseSuccess | ErrorResponse;
