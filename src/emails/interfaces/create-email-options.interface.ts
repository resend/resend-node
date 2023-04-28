import { PostOptions } from '../../common/interfaces';

export interface CreateEmailOptions {
  id: string;
  bcc?: string[];
  cc?: string[];
  from: string;
  html?: string;
  text?: string;
  to: string[];
  subject: string;
}

export interface CreateEmailRequestOptions extends PostOptions {}

export interface CreateEmailResponse {
  id: string;
}
