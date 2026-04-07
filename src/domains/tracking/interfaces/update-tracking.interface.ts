import type { Response } from '../../../interfaces';
import type { Tracking, TrackingRecord } from './tracking';

export interface UpdateTrackingOptions {
  is_active?: boolean;
  open_tracking?: boolean;
  click_tracking?: boolean;
}

export interface UpdateTrackingResponseSuccess extends Tracking {
  records: TrackingRecord[];
}

export type UpdateTrackingResponse =
  Response<UpdateTrackingResponseSuccess>;
