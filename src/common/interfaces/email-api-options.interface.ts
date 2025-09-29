import type { Tag } from '../../interfaces';

export interface EmailApiAttachment {
  content?: string | Buffer;
  filename?: string | false | undefined;
  path?: string;
  content_type?: string;
  content_id?: string;
}

export interface EmailApiOptions {
  from?: string;
  to: string | string[];
  subject?: string;
  region?: string;
  headers?: Record<string, string>;
  html?: string;
  text?: string;
  bcc?: string | string[];
  cc?: string | string[];
  reply_to?: string | string[];
  scheduled_at?: string;
  tags?: Tag[];
  attachments?: EmailApiAttachment[];
  template?: {
    id: string;
    variables?: Record<string, string | number | boolean>;
  };
}
