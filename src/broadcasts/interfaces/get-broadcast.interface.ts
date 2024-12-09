import type { ErrorResponse } from '../../interfaces';
import type { Broadcast } from './broadcast';

export interface GetBroadcastResponseSuccess extends Broadcast {
  object: 'broadcast';
}

export interface GetBroadcastResponse {
  data: GetBroadcastResponseSuccess | null;
  error: ErrorResponse | null;
}
