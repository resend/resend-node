import * as React from 'react';
import { PostOptions } from '../../common/interfaces';
import { RequireAtLeastOne } from 'type-fest';

interface CreateEmailBaseOptions {
  attachments?: Attachment[];
  bcc?: string | string[];
  cc?: string | string[];
  from: string;
  headers?: Record<string, string>;
  react?: React.ReactElement | React.ReactNode | null;
  html: string;
  text?: string;
  reply_to?: string | string[];
  subject: string;
  tags?: Tag[];
  to: string | string[];
}

export type CreateEmailOptions = RequireAtLeastOne<
  CreateEmailBaseOptions,
  'react' | 'html' | 'text'
>;

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
