import type { Response } from '../../interfaces';
import type { EventSchemaMap } from './event';

export interface UpdateEventOptions {
  schema: EventSchemaMap | null;
}

export interface UpdateEventResponseSuccess {
  object: 'event';
  id: string;
}

export type UpdateEventResponse = Response<UpdateEventResponseSuccess>;
