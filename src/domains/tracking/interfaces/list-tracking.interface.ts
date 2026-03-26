import type { Response } from '../../../interfaces';
import type { Tracking } from './tracking';

export interface ListTrackingResponseSuccess {
  object: 'list';
  data: Tracking[];
}

export type ListTrackingResponse =
  Response<ListTrackingResponseSuccess>;
