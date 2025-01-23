import type { Attachment } from '../../emails/interfaces/create-email-options.interface';
import type { Tag } from '../../interfaces';

export interface EmailAPIOptions {
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
  scheduled_at?: string;
  tags?: Tag[];
  attachments?: Attachment[];
}
