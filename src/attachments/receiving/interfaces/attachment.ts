export interface InboundAttachment {
  id: string;
  filename?: string;
  content_type: string;
  content_disposition: 'inline' | 'attachment';
  content_id?: string;
  content: string; // base64
}
