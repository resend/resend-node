import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxMessage } from './thread';

export type GetInboxThreadEmailOptions = InboxSelector & {
  threadId: string;
  emailId: string;
};

export type GetInboxThreadEmailResponseSuccess = InboxMessage;

export type GetInboxThreadEmailResponse =
  Response<GetInboxThreadEmailResponseSuccess>;
