import type { PostOptions } from '../../../common/interfaces';
import type { IdempotentRequest } from '../../../common/interfaces/idempotent-request.interface';
import type { Attachment } from '../../../emails/interfaces/create-email-options.interface';
import type { Response } from '../../../interfaces';

export interface ForwardInboxThreadEmailOptions {
  inboxId: string;
  threadId: string;
  emailId: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  html?: string;
  text?: string;
  subject?: string;
  /**
   * Files to attach, as on `POST /emails`. Each one needs `content` or `path`.
   * They share one limit with the attachments of the original message, which the forward also sends.
   * Together they can have up to 10 files and at most 25 MB of `content`.
   * A `path` file counts toward the 10 files only, because it is fetched when the email is sent.
   * An original attachment that was sent from a URL (`path`) cannot be forwarded, and the request returns a 422.
   */
  attachments?: Attachment[];
}

export interface ForwardInboxThreadEmailRequestOptions
  extends PostOptions,
    IdempotentRequest {}

export interface ForwardInboxThreadEmailResponseSuccess {
  id: string;
}

export type ForwardInboxThreadEmailResponse =
  Response<ForwardInboxThreadEmailResponseSuccess>;
