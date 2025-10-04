export interface InboundEmail {
  id: string;
  to: string[];
  from: string;
  createdAt: string;
  subject: string;
  bcc: string[] | null;
  cc: string[] | null;
  replyTo: string[] | null;
  html: string | null;
  text: string | null;
  headers: Record<string, string>;
  attachments: InboundEmailAttachment[];
}

export interface InboundEmailAttachment {
  id: string;
  filename: string;
  contentType: string;
  contentId: string;
  contentDisposition: string;
}
