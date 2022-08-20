import { ReactElement } from 'react';

export interface SendEmailData {
  from: string;
  to: string | string[];
  bcc?: string | string[];
  cc?: string | string[];
  subject?: string;
  text?: string;
  html?: string;
  react?: ReactElement;
}
