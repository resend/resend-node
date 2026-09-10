import type { Response } from '../../../interfaces';
import type { InboxMessage, InboxThreadSummary } from './thread';

export interface GetInboxThreadOptions {
  inboxId: string;
  threadId: string;
}

export interface GetInboxThreadResponseSuccess extends InboxThreadSummary {
  messages: {
    has_more: boolean;
    data: InboxMessage[];
  };
}

export type GetInboxThreadResponse = Response<GetInboxThreadResponseSuccess>;
