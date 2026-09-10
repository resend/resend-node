import type { Response } from '../../../interfaces';
import type { InboxMessage } from './thread';

export interface GetInboxThreadEmailOptions {
  inboxId: string;
  threadId: string;
  emailId: string;
}

export type GetInboxThreadEmailResponseSuccess = InboxMessage;

export type GetInboxThreadEmailResponse =
  Response<GetInboxThreadEmailResponseSuccess>;
