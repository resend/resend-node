import type { PostOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { ReplyInboxThreadEmailResponseSuccess } from './reply-inbox-thread-email.interface';

export interface ForwardInboxThreadEmailOptions {
  to: string | string[];
  html?: string;
  text?: string;
  subject?: string;
}

export interface ForwardInboxThreadEmailRequestOptions extends PostOptions {}

export type ForwardInboxThreadEmailResponseSuccess =
  ReplyInboxThreadEmailResponseSuccess;

export type ForwardInboxThreadEmailResponse =
  Response<ForwardInboxThreadEmailResponseSuccess>;
