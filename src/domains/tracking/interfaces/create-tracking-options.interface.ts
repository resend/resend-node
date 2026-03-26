import type { PostOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { Tracking, TrackingRecord } from './tracking';

export interface CreateTrackingOptions {
  subdomain: string;
  open_tracking?: boolean;
  click_tracking?: boolean;
}

export interface CreateTrackingRequestOptions extends PostOptions {}

export interface CreateTrackingResponseSuccess extends Tracking {
  records: TrackingRecord[];
}

export type CreateTrackingResponse =
  Response<CreateTrackingResponseSuccess>;
