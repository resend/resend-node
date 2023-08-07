import * as React from 'react';
import { PostOptions } from '../../common/interfaces';

type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]

interface EmailRenderOptions {
  html?:string;
  react?: React.ReactElement | React.ReactNode | null;
  text?: string;
}

interface CreateEmailBaseOptions extends EmailRenderOptions {
  attachments?: Attachment[];
  bcc?: string | string[];
  cc?: string | string[];
  from: string;
  headers?: Record<string, string>;
  reply_to?: string | string[];
  subject: string;
  tags?: Tag[];
  to: string | string[];
}

export type CreateEmailOptions = RequireAtLeastOne<EmailRenderOptions>;

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
