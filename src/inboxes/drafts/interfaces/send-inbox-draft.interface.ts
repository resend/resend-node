import type { PostOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';

export interface SendInboxDraftOptions {
  inboxId: string;
  draftId: string;
}

export interface SendInboxDraftRequestOptions extends PostOptions {}

export interface SendInboxDraftResponseSuccess {
  object: 'inbox_draft';
  id: string;
  thread_id: string;
  email_id: string;
}

export type SendInboxDraftResponse = Response<SendInboxDraftResponseSuccess>;
