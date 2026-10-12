import type {
  PostOptions,
  RequireAtLeastOne,
} from '../../../common/interfaces';
import type { IdempotentRequest } from '../../../common/interfaces/idempotent-request.interface';
import type { Attachment } from '../../../emails/interfaces/create-email-options.interface';
import type { Response } from '../../../interfaces';

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
    /**
     * Files to attach, as on `POST /emails`. Each one needs `content` or `path`.
     * Up to 10 files. The `content` of all files can total at most 25 MB.
     * A `path` file counts toward the 10 files only, because it is fetched when the email is sent.
     */
    attachments?: Attachment[];
  };

export interface ReplyInboxThreadEmailRequestOptions
  extends PostOptions,
    IdempotentRequest {}

export interface ReplyInboxThreadEmailResponseSuccess {
  id: string;
}

export type ReplyInboxThreadEmailResponse =
  Response<ReplyInboxThreadEmailResponseSuccess>;
