import type { ErrorResponse } from '../../interfaces';

type LastEvent =
  | 'delivered'
  | 'opened'
  | 'clicked'
  | 'bounced'
  | 'complained'
  | 'delivery_delayed'
  | 'scheduled_at'
  | 'canceled';

interface CommonResponse {
  bcc: string[] | null;
  cc: string[] | null;
  from: string;
  html: string | null;
  id: string;
  subject: string;
  text: string | null;
  to: string[];
  object: 'email';
}

interface GetEmailResponseData extends CommonResponse {
  createdAt: string;
  lastEvent: LastEvent;
  replyTo: string[] | null;
  scheduledAt: string | null;
}

export interface GetEmailResponseSuccess extends CommonResponse {
  created_at: string;
  last_event: LastEvent;
  reply_to: string[] | null;
  scheduled_at: string | null;
}

export interface GetEmailResponse {
  data: GetEmailResponseData | null;
  error: ErrorResponse | null;
}
