import type { Response } from '../../interfaces';
import type { Broadcast } from './broadcast';

export interface CancelBroadcastResponseSuccess extends Pick<Broadcast, 'id'> {
  object: 'broadcast';
}

export type CancelBroadcastResponse = Response<CancelBroadcastResponseSuccess>;
