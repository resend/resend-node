import type { Response } from '../../interfaces';
import type { EventSchemaMap } from './event';

export interface CreateEventOptions {
  name: string;
  schema?: EventSchemaMap | null;
}

export interface CreateEventResponseSuccess {
  object: 'event';
  id: string;
}

export type CreateEventResponse = Response<CreateEventResponseSuccess>;
