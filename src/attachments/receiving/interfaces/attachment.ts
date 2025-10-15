export interface InboundAttachment {
  id: string;
  filename?: string;
  content_type: string;
  content_disposition: 'inline' | 'attachment';
  content_id?: string;
  content: string; // base64
}

export interface ApiInboundAttachment {
  id: string;
  filename?: string;
  content_type: string;
  content_disposition: 'inline' | 'attachment';
  content_id?: string;
  download_url: string;
  expires_at: string;
}
