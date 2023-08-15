export interface GetEmailResponse {
  bcc: string[] | null;
  cc: string[] | null;
  created_at: string;
  from: string;
  html: string | null;
  id: string;
  last_event: string;
  reply_to: string[] | null;
  subject: string;
  text: string | null;
  to: string[];
  object: 'email';
}
