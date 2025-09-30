export interface InboundAttachment {
  id: string;
  filename?: string;
  contentType: string;
  contentDisposition: 'inline' | 'attachment';
  contentId?: string;
  content: string; // base64
}
