export type SuppressionOrigin = 'bounce' | 'complaint' | 'manual';

export interface SuppressionListEntry {
  object: 'suppression';
  id: string;
  email: string;
  origin: SuppressionOrigin;
  source_id: string | null;
  created_at: string;
}
