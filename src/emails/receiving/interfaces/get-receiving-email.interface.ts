import type { Response } from '../../../interfaces';

/**
 * Attachment metadata embedded in the GET /inbounds/{id} response.
 * These are raw DB values — fields are nullable and content_disposition is
 * not normalized to a literal union.
 *
 * Not to be confused with AttachmentData, which is the shape returned by the
 * dedicated attachment endpoints (includes download_url and expires_at).
 */
export interface InboundAttachment {
  id: string;
  filename: string | null;
  size: number;
  content_type: string;
  content_id: string | null;
  content_disposition: string | null;
}

export interface GetReceivingEmailResponseSuccess {
  object: 'email';
  id: string;
  to: string[];
  from: string;
  created_at: string;
  subject: string;
  bcc: string[] | null;
  cc: string[] | null;
  reply_to: string[] | null;
  html: string | null;
  text: string | null;
  headers: Record<string, string> | null;
  message_id: string;
  raw?: {
    download_url: string;
    expires_at: string;
  } | null;
  attachments: InboundAttachment[];
}

export type GetReceivingEmailResponse =
  Response<GetReceivingEmailResponseSuccess>;
