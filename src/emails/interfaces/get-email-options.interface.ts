import type { Response } from '../../interfaces';

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
  tags?: { name: string; value: string }[];
  to: string[];
  scheduled_at: string | null;
  object: 'email';
}

export type GetEmailResponse = Response<GetEmailResponseSuccess>;
