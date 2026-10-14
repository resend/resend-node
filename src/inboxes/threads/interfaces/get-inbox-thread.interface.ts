import type { Response } from '../../../interfaces';
import type { InboxThreadSummary } from './thread';

export interface GetInboxThreadOptions {
  inboxId: string;
  threadId: string;
}

export type GetInboxThreadResponseSuccess = InboxThreadSummary;

export type GetInboxThreadResponse = Response<GetInboxThreadResponseSuccess>;
