export type TrackingStatus = 'not_started' | 'pending' | 'verified' | 'failed';

export interface TrackingRecord {
  record: 'Tracking';
  type: 'CNAME';
  name: string;
  value: string;
  ttl: 'Auto';
  status: TrackingStatus;
}

export interface Tracking {
  object: 'tracking';
  id: string;
  name: string;
  full_name: string;
  status: TrackingStatus;
  open_tracking: boolean;
  click_tracking: boolean;
  is_active: boolean;
  created_at: string;
}
