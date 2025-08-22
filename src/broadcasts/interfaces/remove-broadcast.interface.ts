import type { Response } from '../../interfaces';
import type { Broadcast } from './broadcast';

export interface RemoveBroadcastResponseSuccess extends Pick<Broadcast, 'id'> {
  object: 'broadcast';
  deleted: boolean;
}

export type RemoveBroadcastResponse = Response<RemoveBroadcastResponseSuccess>;
