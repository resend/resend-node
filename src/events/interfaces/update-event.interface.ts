import type { Response } from '../../interfaces';

export interface UpdateEventOptions {
  schema: unknown;
}

export interface UpdateEventResponseSuccess {
  object: 'event';
  id: string;
}

export type UpdateEventResponse = Response<UpdateEventResponseSuccess>;
