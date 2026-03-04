import type { Response } from '../../interfaces';
import type { Event } from './event';

export interface GetEventResponseSuccess extends Event {
  object: 'event';
}

export type GetEventResponse = Response<GetEventResponseSuccess>;
