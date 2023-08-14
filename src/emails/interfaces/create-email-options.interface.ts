import * as React from 'react';
import { PostOptions } from '../../common/interfaces';
import { RequireAtLeastOne } from 'type-fest';
import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

interface SvelteEmailConfig<Component extends SvelteComponent> {
  template: ComponentType<Component>;
  props?: ComponentProps<Component>;
  options?: {
    plainText?: boolean;
    pretty?: boolean;
  };
}

interface CreateEmailBaseOptions {
  attachments?: Attachment[];
  bcc?: string | string[];
  cc?: string | string[];
  from: string;
  headers?: Record<string, string>;
  react?: React.ReactElement | React.ReactNode | null;
  svelte?: SvelteEmailConfig<SvelteComponent> | null;
  html?: string;
  text?: string;
  reply_to?: string | string[];
  subject: string;
  tags?: Tag[];
  to: string | string[];
}

export type CreateEmailOptions = RequireAtLeastOne<
  CreateEmailBaseOptions,
  'react' | 'svelte' | 'html' | 'text'
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
