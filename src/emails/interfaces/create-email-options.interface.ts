import type * as React from 'react';
import type { PostOptions } from '../../common/interfaces';
import type { RequireAtLeastOne } from '../../common/interfaces/require-at-least-one';
import type { ErrorResponse } from '../../interfaces';

interface EmailRenderOptions {
  /**
   * The React component used to write the message.
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  react: React.ReactNode;
  /**
   * The HTML version of the message.
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  html: string;
  /**
   * The plain text version of the message.
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  text: string;
}

interface CreateEmailBaseOptions {
  /**
   * Filename and content of attachments (max 40mb per email)
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  attachments?: Attachment[];
  /**
   * Blind carbon copy recipient email address. For multiple addresses, send as an array of strings.
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  bcc?: string | string[];
  /**
   * Carbon copy recipient email address. For multiple addresses, send as an array of strings.
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  cc?: string | string[];
  /**
   * Sender email address. To include a friendly name, use the format `"Your Name <sender@domain.com>"`
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  from: string;
  /**
   * Custom headers to add to the email.
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  headers?: Record<string, string>;
  /**
   * Reply-to email address. For multiple addresses, send as an array of strings.
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  replyTo?: string | string[];
  /**
   * Email subject.
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  subject: string;
  /**
   * Email tags
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  tags?: Tag[];
  /**
   * Recipient email address. For multiple addresses, send as an array of strings. Max 50.
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  to: string | string[];
  /**
   * Schedule email to be sent later.
   * The date should be in ISO 8601 format (e.g: 2024-08-05T11:52:01.858Z).
   *
   * @link https://resend.com/docs/api-reference/emails/send-email#body-parameters
   */
  scheduledAt?: string;
}

export type CreateEmailOptions = RequireAtLeastOne<EmailRenderOptions> &
  CreateEmailBaseOptions;

export interface CreateEmailRequestOptions extends PostOptions {}

export interface CreateEmailResponseSuccess {
  /** The ID of the newly created email. */
  id: string;
}

export interface CreateEmailResponse {
  data: CreateEmailResponseSuccess | null;
  error: ErrorResponse | null;
}

export interface Attachment {
  /** Content of an attached file. */
  content?: string | Buffer;
  /** Name of attached file. */
  filename?: string | false | undefined;
  /** Path where the attachment file is hosted */
  path?: string;
  /** Optional content type for the attachment, if not set will be derived from the filename property */
  contentType?: string;
}

export type Tag = {
  /**
   * The name of the email tag. It can only contain ASCII letters (a–z, A–Z), numbers (0–9), underscores (_), or dashes (-). It can contain no more than 256 characters.
   */
  name: string;
  /**
   * The value of the email tag. It can only contain ASCII letters (a–z, A–Z), numbers (0–9), underscores (_), or dashes (-). It can contain no more than 256 characters.
   */
  value: string;
};
