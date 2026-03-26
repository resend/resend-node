import type { PostOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { TrackingDomain, TrackingDomainRecord } from './tracking-domain';

export interface CreateTrackingDomainOptions {
  subdomain: string;
  open_tracking?: boolean;
  click_tracking?: boolean;
}

export interface CreateTrackingDomainRequestOptions extends PostOptions {}

export interface CreateTrackingDomainResponseSuccess extends TrackingDomain {
  records: TrackingDomainRecord[];
}

export type CreateTrackingDomainResponse =
  Response<CreateTrackingDomainResponseSuccess>;
