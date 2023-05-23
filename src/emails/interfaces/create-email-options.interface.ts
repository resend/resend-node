import { PostOptions } from '../../common/interfaces';

export interface CreateEmailOptions {
  bcc?: string | string[];
  cc?: string | string[];
  from: string;
  html?: string;
  reply_to?: string | string[];
  subject: string;
  text?: string;
  to: string | string[];
}

export interface CreateEmailRequestOptions extends PostOptions {}

export interface CreateEmailResponse {
  id: string;
}
