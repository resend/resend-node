import { ReactElement } from 'react';

export interface SendEmailData {
  from: string;
  to: string;
  bcc?: string;
  cc?: string;
  subject?: string;
  text?: string;
  html?: string;
  react?: ReactElement;
}
