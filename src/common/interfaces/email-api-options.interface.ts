import type { Attachment } from '../../emails/interfaces/create-email-options.interface';
import type { Tag } from '../../interfaces';

export interface EmailApiOptions {
  from: string;
  to: string | string[];
  subject: string;
  region?: string;
  headers?: Record<string, string>;
  html?: string;
  text?: string;
  bcc?: string | string[];
  cc?: string | string[];
  reply_to?: string | string[];
  topic_id?: string | null;
  scheduled_at?: string;
  tags?: Tag[];
  attachments?: Attachment[];
}
