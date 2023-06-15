import { ReactElement } from 'react';
import { PostOptions } from '../../common/interfaces';

export interface CreateEmailOptions {
  attachments?: Attachment[];
  bcc?: string | string[];
  cc?: string | string[];
  from: string;
  html?: string;
  react?: ReactElement | null;
  reply_to?: string | string[];
  subject: string;
  tags?: Tag[];
  text?: string;
  to: string | string[];
}

export interface CreateEmailRequestOptions extends PostOptions {}

export interface CreateEmailResponse {
  id: string;
}

interface Attachment {
  content?: string | Buffer;
  filename?: string | false | undefined;
  path?: string;
}

export type Tag = { name: string; value: string };
