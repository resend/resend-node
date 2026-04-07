export type TrackingDomainStatus = 'pending' | 'verified' | 'failed';

export interface TrackingDomainRecord {
  type: 'CNAME' | 'TXT';
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
