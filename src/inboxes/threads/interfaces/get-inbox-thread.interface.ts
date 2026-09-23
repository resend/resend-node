import type { Response } from '../../../interfaces';
import type { InboxMessage, InboxThreadSummary } from './thread';

export interface GetInboxThreadOptions {
  inboxId: string;
  threadId: string;
}

export interface GetInboxThreadResponseSuccess extends InboxThreadSummary {
  messages: InboxMessage[];
}

export type GetInboxThreadResponse = Response<GetInboxThreadResponseSuccess>;
