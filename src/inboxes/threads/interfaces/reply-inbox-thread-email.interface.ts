import type {
  PostOptions,
  RequireAtLeastOne,
} from '../../../common/interfaces';
import type { IdempotentRequest } from '../../../common/interfaces/idempotent-request.interface';
import type { Response } from '../../../interfaces';
import type { InboxMessage } from './thread';

export type ReplyInboxThreadEmailOptions = {
  inboxId: string;
  threadId: string;
  emailId: string;
} & RequireAtLeastOne<{
  html?: string;
  text?: string;
}> & {
    cc?: string | string[];
    bcc?: string | string[];
    subject?: string;
    replyAll?: boolean;
  };

export interface ReplyInboxThreadEmailRequestOptions
  extends PostOptions,
    IdempotentRequest {}

export type ReplyInboxThreadEmailResponseSuccess = InboxMessage & {
  direction: 'outbound';
  email_id: string;
};

export type ReplyInboxThreadEmailResponse =
  Response<ReplyInboxThreadEmailResponseSuccess>;
