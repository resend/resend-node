import type { PostOptions } from '../../../common/interfaces';
import type { IdempotentRequest } from '../../../common/interfaces/idempotent-request.interface';
import type { Response } from '../../../interfaces';

export interface ForwardInboxThreadEmailOptions {
  inboxId: string;
  threadId: string;
  emailId: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  html?: string;
  text?: string;
  subject?: string;
}

export interface ForwardInboxThreadEmailRequestOptions
  extends PostOptions,
    IdempotentRequest {}

export interface ForwardInboxThreadEmailResponseSuccess {
  id: string;
}

export type ForwardInboxThreadEmailResponse =
  Response<ForwardInboxThreadEmailResponseSuccess>;
