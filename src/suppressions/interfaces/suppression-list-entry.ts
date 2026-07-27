export type SuppressionOrigin = 'bounce' | 'complaint' | 'manual';

export interface Suppression {
  object: 'suppression';
  id: string;
  email: string;
  origin: SuppressionOrigin;
  source_id: string | null;
  created_at: string;
}

export type SuppressionListEntry = Omit<Suppression, 'object'>;
