import type { ErrorResponse } from '../../interfaces';

export interface GetEmailResponseSuccess {
  bcc: string[] | null;
  cc: string[] | null;
  created_at: string;
  from: string;
  html: string | null;
  id: string;
  last_event:
    | 'bounced'
    | 'canceled'
    | 'clicked'
    | 'complained'
    | 'delivered'
    | 'delivery_delayed'
    | 'failed'
    | 'opened'
    | 'queued'
    | 'scheduled'
    | 'sent';
  reply_to: string[] | null;
  subject: string;
  text: string | null;
  to: string[];
  topic_id?: string | null;
  scheduled_at: string | null;
  object: 'email';
}

export interface GetEmailResponse {
  data: GetEmailResponseSuccess | null;
  error: ErrorResponse | null;
}
