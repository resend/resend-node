import type { ErrorResponse } from '../../interfaces';
import type { Broadcast } from './broadcast';

export interface GetBroadcastResponseSuccess extends Broadcast {
  object: 'broadcast';
}

export type GetBroadcastResponse =
  | {
      data: GetBroadcastResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
