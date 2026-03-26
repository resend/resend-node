import type { Response } from '../../../interfaces';
import type { Tracking, TrackingRecord } from './tracking';

export interface GetTrackingResponseSuccess extends Tracking {
  records: TrackingRecord[];
}

export type GetTrackingResponse =
  Response<GetTrackingResponseSuccess>;
