import type { ErrorResponse } from '../../interfaces';
import type { Broadcast } from './broadcast';

export interface RemoveBroadcastResponseSuccess extends Pick<Broadcast, 'id'> {
  object: 'broadcast';
  deleted: boolean;
}

export type RemoveBroadcastResponse =
  | {
      data: RemoveBroadcastResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
