import type { ErrorResponse } from '../../interfaces';
import type { InboundEmail } from './inbound-email';

// API response type (snake_case from API)
export interface GetInboundEmailApiResponse {
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
  attachments: Array<{
    id: string;
    filename: string;
    content_type: string;
    content_id: string;
    content_disposition: string;
  }>;
}

// SDK response type (camelCase for users)
export interface GetInboundEmailResponseSuccess extends InboundEmail {
  object: 'inbound';
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
