import type { Response } from '../../../interfaces';

export interface RemoveInboxThreadResponseSuccess {
  object: 'inbox_thread';
  id: string;
  deleted: boolean;
}

export type RemoveInboxThreadResponse =
  Response<RemoveInboxThreadResponseSuccess>;
