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
     * An empty file, a blocked file type, a `path` that is not an `http` or `https` URL or that points to `localhost`, `127.0.0.1` or `0.0.0.0`,
     * or a `content_type` that is not a valid MIME type returns a 422.
     */
    attachments?: Attachment[];
    /**
     * Custom headers to add to the email.
     * The `In-Reply-To`, `References` and `Reply-To` headers are set by Resend and cannot be set here.
     * Sending one of them, in any letter case, returns a 422.
     * Header names cannot be empty, and names and values cannot contain line breaks or null characters, or the request returns a 422.
     * `null` means no custom headers.
     */
    headers?: Record<string, string> | null;
  };

export interface ReplyInboxThreadEmailRequestOptions
  extends PostOptions,
    IdempotentRequest {}

export interface ReplyInboxThreadEmailResponseSuccess {
  id: string;
}

export type ReplyInboxThreadEmailResponse =
  Response<ReplyInboxThreadEmailResponseSuccess>;
