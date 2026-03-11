import type { Response } from '../../../interfaces';
import type { TrackingDomain, TrackingDomainRecord } from './tracking-domain';

export interface GetTrackingDomainResponseSuccess extends TrackingDomain {
  records: TrackingDomainRecord[];
}

export type GetTrackingDomainResponse =
  Response<GetTrackingDomainResponseSuccess>;
