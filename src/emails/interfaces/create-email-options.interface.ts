import { ReactElement } from 'react';
import { PostOptions } from '../../common/interfaces';

interface CreateEmailBaseOptions {
  attachments?: Attachment[];
  bcc?: string | string[];
  cc?: string | string[];
  from: string;
  react?: ReactElement | null;
  reply_to?: string | string[];
  subject: string;
  tags?: Tag[];
  to: string | string[];
}

interface CreateEmailWithHtmlOptions extends CreateEmailBaseOptions {
  html: string
  text?: string
}

interface CreateEmailWithTextOptions extends CreateEmailBaseOptions {
  html?: string
  text: string
}

export type CreateEmailOptions = CreateEmailWithHtmlOptions | CreateEmailWithTextOptions

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
