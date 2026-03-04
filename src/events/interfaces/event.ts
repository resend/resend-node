export type EventSchemaType = 'string' | 'number' | 'boolean' | 'date';

export type EventSchemaMap = Record<string, EventSchemaType>;

export interface Event {
  object: 'event';
  id: string;
  name: string;
  schema: EventSchemaMap | null;
  created_at: string;
  updated_at: string | null;
}
