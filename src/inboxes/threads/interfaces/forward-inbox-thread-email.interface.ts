import type { PostOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxMessageAttachment } from './thread';

export interface ForwardInboxThreadEmailOptions {
  inboxId: string;
  threadId: string;
  emailId: string;
  to: string | string[];
  html?: string;
  text?: string;
  subject?: string;
}

export interface ForwardInboxThreadEmailRequestOptions extends PostOptions {}

export interface ForwardInboxThreadEmailResponseSuccess {
  id: string;
  email_id: string;
  direction: 'outbound';
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  html: string | null;
  text: string | null;
  attachments: InboxMessageAttachment[];
  read: boolean;
  received_at: string;
}

export type ForwardInboxThreadEmailResponse =
  Response<ForwardInboxThreadEmailResponseSuccess>;
