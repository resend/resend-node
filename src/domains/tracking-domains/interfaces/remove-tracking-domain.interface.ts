import type { Response } from '../../../interfaces';

export interface RemoveTrackingDomainResponseSuccess {
  object: 'tracking';
  id: string;
  deleted: true;
}

export type RemoveTrackingDomainResponse =
  Response<RemoveTrackingDomainResponseSuccess>;
