import type { PostOptions } from '../../../common/interfaces';
import type { IdempotentRequest } from '../../../common/interfaces/idempotent-request.interface';
import type { Attachment } from '../../../emails/interfaces/create-email-options.interface';
import type { Response } from '../../../interfaces';

export interface ForwardInboxEmailOptions {
  inboxId: string;
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
   * An empty file, a blocked file type, a `path` that is not an `http` or `https` URL or that points to `localhost`, `127.0.0.1` or `0.0.0.0`,
   * or a `content_type` that is not a valid MIME type returns a 422.
   * An original attachment that was sent from a URL (`path`) cannot be forwarded, and the request returns a 422.
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
}

export interface ForwardInboxEmailRequestOptions
  extends PostOptions,
    IdempotentRequest {}

export interface ForwardInboxEmailResponseSuccess {
  id: string;
}

export type ForwardInboxEmailResponse =
  Response<ForwardInboxEmailResponseSuccess>;
