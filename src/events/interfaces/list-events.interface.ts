import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Event } from './event';

export type ListEventsOptions = PaginationOptions;

export interface ListEventsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: Omit<Event, 'object'>[];
}

export type ListEventsResponse = Response<ListEventsResponseSuccess>;
