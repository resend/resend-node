import type { Response } from '../../interfaces';

export interface CreateEventOptions {
  name: string;
  schema?: unknown | null;
}

export interface CreateEventResponseSuccess {
  object: 'event';
  id: string;
}

export type CreateEventResponse = Response<CreateEventResponseSuccess>;
