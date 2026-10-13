import type {
  PostOptions,
  RequireAtLeastOne,
} from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxDraftAttachmentOptions } from './draft';

type CreateInboxDraftContent = RequireAtLeastOne<{
  to?: string | string[] | null;
  cc?: string | string[] | null;
  bcc?: string | string[] | null;
  subject?: string | null;
  text?: string | null;
  html?: string | null;
  /**
   * Files to store on the draft. Each one needs `content`, `filename` and `contentType`.
   * A draft can carry up to 10 files and 25 MB in total.
   */
  attachments?: InboxDraftAttachmentOptions[];
}>;

export type CreateInboxDraftOptions = {
  inboxId: string;
} & CreateInboxDraftContent &
  (
    | {
        threadId: string;
        replyToEmailId: string;
      }
    | {
        threadId?: never;
        replyToEmailId?: never;
      }
  );

export interface CreateInboxDraftRequestOptions extends PostOptions {}

export interface CreateInboxDraftResponseSuccess {
  object: 'inbox_draft';
  id: string;
}

export type CreateInboxDraftResponse =
  Response<CreateInboxDraftResponseSuccess>;
