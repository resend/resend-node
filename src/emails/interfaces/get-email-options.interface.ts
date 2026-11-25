import type { Response } from '../../interfaces';

export interface GetEmailResponseBounce {
  message: string | null;
  type: 'Undetermined' | 'Transient' | 'Permanent' | null;
  subType:
    | 'Undetermined'
    | 'General'
    | 'NoEmail'
    | 'MailboxFull'
    | 'MessageTooLarge'
    | 'ContentRejected'
    | 'AttachmentRejected'
    | null;
  diagnosticCode?: string[];
}

export interface GetEmailResponseSuccess {
  bcc: string[] | null;
  bounce?: GetEmailResponseBounce;
  cc: string[] | null;
  created_at: string;
  from: string;
  html: string | null;
  id: string;
  message_id: string;
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
    | 'sent'
    | 'suppressed';
  reply_to: string[] | null;
  subject: string;
  text: string | null;
  tags?: { name: string; value: string }[];
  to: string[];
  topic_id?: string | null;
  scheduled_at: string | null;
  object: 'email';
}

export type GetEmailResponse = Response<GetEmailResponseSuccess>;
