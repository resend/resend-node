import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';

export type RemoveInboxThreadOptions = InboxSelector & {
  threadId: string;
};

export interface RemoveInboxThreadResponseSuccess {
  object: 'inbox_thread';
  id: string;
  deleted: boolean;
}

export type RemoveInboxThreadResponse =
  Response<RemoveInboxThreadResponseSuccess>;
