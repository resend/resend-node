export type TrackingDomainStatus = 'not_started' | 'pending' | 'verified' | 'failed';

export interface TrackingDomainRecord {
  record: 'Tracking';
  type: 'CNAME';
  name: string;
  value: string;
  ttl: 'Auto';
  status: TrackingDomainStatus;
}

export interface TrackingDomain {
  object: 'tracking_domain';
  id: string;
  name: string;
  full_name: string;
  status: TrackingDomainStatus;
  created_at: string;
}
