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
  object: 'tracking';
  id: string;
  name: string;
  full_name: string;
  status: TrackingDomainStatus;
  open_tracking: boolean;
  click_tracking: boolean;
  is_active: boolean;
  created_at: string;
}
