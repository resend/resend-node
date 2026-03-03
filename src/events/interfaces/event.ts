export interface Event {
  object: 'event';
  id: string;
  name: string;
  schema: unknown | null;
  created_at: string;
  updated_at: string | null;
}
