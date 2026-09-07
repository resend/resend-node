import type { PostOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxDraft } from './draft';

interface CreateInboxDraftContent {
  to?: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject?: string | null;
  text?: string | null;
  html?: string | null;
}

export type CreateInboxDraftOptions = CreateInboxDraftContent &
  (
    | {
        thread_id: string;
        reply_to_email_id: string;
      }
    | {
        thread_id?: never;
        reply_to_email_id?: never;
      }
  );

export interface CreateInboxDraftRequestOptions extends PostOptions {}

export type CreateInboxDraftResponseSuccess = InboxDraft;

export type CreateInboxDraftResponse =
  Response<CreateInboxDraftResponseSuccess>;
