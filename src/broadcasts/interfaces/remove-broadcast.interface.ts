import type { ErrorResponse } from '../../interfaces';
import type { Broadcast } from './broadcast';

export interface RemoveBroadcastResponseSuccess extends Pick<Broadcast, 'id'> {
  object: 'broadcast';
  deleted: boolean;
}

export interface RemoveBroadcastResponse {
  data: RemoveBroadcastResponseSuccess | null;
  error: ErrorResponse | null;
}
