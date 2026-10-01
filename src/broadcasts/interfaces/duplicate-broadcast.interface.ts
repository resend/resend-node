import type { Response } from '../../interfaces';
import type { Broadcast } from './broadcast';

export interface DuplicateBroadcastResponseSuccess
  extends Pick<Broadcast, 'id'> {
  object: 'broadcast';
}

export type DuplicateBroadcastResponse =
  Response<DuplicateBroadcastResponseSuccess>;
