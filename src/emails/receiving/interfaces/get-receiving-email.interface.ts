import type { Response } from '../../../interfaces';

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
  headers: Record<string, string>;
  message_id: string;
  raw: {
    download_url: string;
    expires_at: string;
  } | null;
  attachments: Array<{
    id: string;
    filename: string | null;
    size: number;
    content_type: string;
    content_id: string | null;
    content_disposition: string | null;
  }>;
}

export type GetReceivingEmailResponse =
  Response<GetReceivingEmailResponseSuccess>;
