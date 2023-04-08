import { ReactElement } from 'react';

export interface SendEmailData {
  /** Sender email address. */
  from: string;
  /** Recipient email address. Max 50. */
  to: string | string[];
  /** Bcc recipient email address. Max 50. */
  bcc?: string | string[];
  /** Cc recipient email address. Max 50. */
  cc?: string | string[];
  /** Reply-to email address. Max 50. */
  reply_to?: string | string[];
  /** Email subject. */
  subject: string;
  /** The plain text version of the message. */
  text?: string;
  /** The HTML version of the message. */
  html?: string;
  /** The React version of the message. */
  react?: ReactElement;
  /** Attachments */
  attachments?: Attachment[];
  /** Email tags */
  tags?: Tag[];
}

interface Attachment {
  content?: string | Buffer;
  filename?: string | false | undefined;
}

export interface SendEmailRequest {
  /** Sender email address. */
  from: string;
  /** Recipient email address. Max 50. */
  to: string | string[];
  /** Bcc recipient email address. Max 50. */
  bcc?: string | string[];
  /** Cc recipient email address. Max 50. */
  cc?: string | string[];
  /** Reply-to email address. Max 50. */
  reply_to?: string | string[];
  /** Email subject. */
  subject: string;
  /** The HTML version of the message. */
  text?: string;
  /** The plain text version of the message. */
  html?: string;
  /** Attachments */
  attachments?: Attachment[];
  /** Email tags */
  tags?: Tag[];
}

export const RESEND_ERROR_CODES_BY_KEY = {
  missing_required_fields: 400,
  missing_api_key: 401,
  invalid_api_Key: 403,
  invalid_from_address: 403,
  not_found: 404,
  method_not_allowed: 405,
  internal_server_error: 500
} as const;

type ValueOf<TObj> = TObj[keyof TObj];

export type RESEND_ERROR_CODE_NUMBER = ValueOf<typeof RESEND_ERROR_CODES_BY_KEY>;
export type RESEND_ERROR_CODE_KEY = keyof typeof RESEND_ERROR_CODES;

interface EmailResponse extends Pick<SendEmailRequest, 'to' | 'from'> {
  id: string;
  created_at: string;
}

interface ErrorResponse {
  error: { message: string; status: RESEND_ERROR_CODE_NUMBER; type: RESEND_ERROR_CODE_KEY };
}

export type SendEmailResponse = EmailResponse | ErrorResponse;

export { EmailResponse, ErrorResponse };

export type Tag = { name: string; value: string };
