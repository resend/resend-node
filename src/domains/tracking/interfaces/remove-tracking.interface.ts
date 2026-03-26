import type { Response } from '../../../interfaces';

export interface RemoveTrackingResponseSuccess {
  object: 'tracking';
  id: string;
  deleted: true;
}

export type RemoveTrackingResponse =
  Response<RemoveTrackingResponseSuccess>;
