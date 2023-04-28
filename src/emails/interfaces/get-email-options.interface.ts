export interface GetEmailResponse {
  bcc?: string[];
  cc?: string[];
  from: string;
  html?: string;
  id: string;
  subject: string;
  text?: string;
  to: string[];
  object: 'email';
}
