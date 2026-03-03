import type { Response } from '../../interfaces';
import type { Event } from './event';

export type GetEventResponseSuccess = Event;

export type GetEventResponse = Response<GetEventResponseSuccess>;
