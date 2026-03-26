import type { Response } from '../../../interfaces';
import type { TrackingDomain, TrackingDomainRecord } from './tracking-domain';

export interface UpdateTrackingDomainOptions {
  is_active?: boolean;
  open_tracking?: boolean;
  click_tracking?: boolean;
}

export interface UpdateTrackingDomainResponseSuccess extends TrackingDomain {
  records: TrackingDomainRecord[];
}

export type UpdateTrackingDomainResponse =
  Response<UpdateTrackingDomainResponseSuccess>;
