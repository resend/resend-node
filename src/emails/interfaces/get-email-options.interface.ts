import type { ErrorResponse } from '../../interfaces';

export interface GetEmailResponseSuccess {
  bcc: string[] | null;
  cc: string[] | null;
  created_at: string;
  from: string;
  html: string | null;
  id: string;
  last_event:
    | 'delivered'
    | 'opened'
    | 'clicked'
    | 'bounced'
    | 'complained'
    | 'delivery_delayed';
  reply_to: string[] | null;
  subject: string;
  text: string | null;
  to: string[];
  object: 'email';
}

export interface GetEmailResponse {
  data: GetEmailResponseSuccess | null;
  error: ErrorResponse | null;
}

export interface CancelScheduleResponse {
  data: CancelScheduleResponseSuccess | null;
  error: ErrorResponse | null;
}

export interface CancelScheduleResponseSuccess {
  email_id: string;
}
