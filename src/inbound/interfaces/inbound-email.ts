export interface InboundEmailAttachment {
  filename?: string;
  contentType?: string;
  size?: number;
  contentDisposition?: string;
  contentId?: string;
  content?: Buffer | string;
  path?: string;
}

export interface InboundEmail {
  id: string;
  to: string[];
  from: string;
  created_at: string;
  subject: string;
  bcc: string[];
  cc: string[];
  reply_to: string | string[] | null;
  html: string;
  text: string;
  attachments: InboundEmailAttachment[] | null;
}
