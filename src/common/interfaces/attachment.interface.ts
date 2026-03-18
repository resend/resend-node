/**
 * Attachment returned by the signed-URL endpoints:
 * - GET /emails/{id}/attachments
 * - GET /emails/{id}/attachments/{id}
 * - GET /emails/receiving/{id}/attachments
 * - GET /emails/receiving/{id}/attachments/{id}
 *
 * Not to be confused with InboundAttachment, which is the raw metadata
 * embedded inside GET /inbounds/{id} — no signed URL, nullable DB columns.
 */
export interface AttachmentData {
  id: string;
  filename?: string;
  size: number;
  content_type: string;
  content_disposition: 'inline' | 'attachment';
  content_id?: string;
  download_url: string;
  expires_at: string;
}
