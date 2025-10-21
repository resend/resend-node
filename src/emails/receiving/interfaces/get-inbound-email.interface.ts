import type { ErrorResponse } from '../../../interfaces';

export interface GetInboundEmailResponseSuccess {
  object: 'inbound';
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
  attachments: Array<{
    id: string;
    filename: string;
    content_type: string;
    content_id: string;
    content_disposition: string;
  }>;
}

export type GetInboundEmailResponse =
  | {
      data: GetInboundEmailResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
