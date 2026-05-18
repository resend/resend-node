import type { Response } from '../../interfaces';
import type { Event } from './event';

export interface RemoveEventResponseSuccess extends Pick<Event, 'id'> {
  object: 'event';
  deleted: boolean;
}

export type RemoveEventResponse = Response<RemoveEventResponseSuccess>;
