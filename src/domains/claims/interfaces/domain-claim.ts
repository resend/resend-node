import type { DomainRegion } from '../../interfaces/domain';

export type DomainClaimStatus =
  | 'pending'
  | 'verified'
  | 'completed'
  | 'blocked'
  | 'expired'
  | 'superseded'
  | 'canceled'
  | 'failed';

export type DomainClaimBlockedReason =
  | 'grace_period'
  | 'recent_owner_activity'
  | 'pending_scheduled_emails';

export interface DomainClaimRecord {
  type: 'TXT';
  name: string;
  value: string;
  ttl: 'Auto';
}

export interface DomainClaim {
  id: string;
  name: string;
  status: DomainClaimStatus;
  domain_id: string | null;
  region: DomainRegion | null;
  record: DomainClaimRecord;
  blocked_reason: DomainClaimBlockedReason | null;
  failure_reason: string | null;
  created_at: string;
  expires_at: string;
}
