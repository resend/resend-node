export type TrackingDomainStatus = 'not_started' | 'pending' | 'verified' | 'failed';

export interface TrackingDomainRecord {
  type: 'CNAME';
  name: string;
  value: string;
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
