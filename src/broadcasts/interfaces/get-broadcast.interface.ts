import type { Response } from '../../interfaces';
import type { Broadcast } from './broadcast';

export interface GetBroadcastResponseSuccess extends Broadcast {
  object: 'broadcast';
}

export type GetBroadcastResponse = Response<GetBroadcastResponseSuccess>;
