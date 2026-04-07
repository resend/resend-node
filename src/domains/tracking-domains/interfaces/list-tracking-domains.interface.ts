import type { Response } from '../../../interfaces';
import type { TrackingDomain } from './tracking-domain';

export interface ListTrackingDomainsResponseSuccess {
  object: 'list';
  data: TrackingDomain[];
}

export type ListTrackingDomainsResponse =
  Response<ListTrackingDomainsResponseSuccess>;
