export type SuppressionReason = 'bounce' | 'complaint' | 'manual';

export interface SuppressionListEntry {
  object: 'suppression';
  id: string;
  email: string;
  reason: SuppressionReason;
  source_id: string | null;
  created_at: string;
  expires_at: string | null;
}
