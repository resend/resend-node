import type { Response } from '../../../interfaces';

export interface RemoveTrackingDomainResponseSuccess {
  object: 'tracking_domain';
  id: string;
  deleted: true;
}

export type RemoveTrackingDomainResponse =
  Response<RemoveTrackingDomainResponseSuccess>;
