import type { RequireAtLeastOne } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxDraft, InboxDraftAttachmentOptions } from './draft';

export type UpdateInboxDraftOptions = {
  inboxId: string;
  draftId: string;
} & RequireAtLeastOne<{
  to?: string | string[] | null;
  cc?: string | string[] | null;
  bcc?: string | string[] | null;
  subject?: string | null;
  text?: string | null;
  html?: string | null;
  /**
   * Files to store on the draft. Each one needs `content`, `filename` and `contentType`.
   * A draft can carry up to 10 files and 25 MB in total.
   * Sending the field replaces every attachment on the draft. Send `[]` to remove them all.
   */
  attachments?: InboxDraftAttachmentOptions[];
}>;

export type UpdateInboxDraftResponseSuccess = InboxDraft;

export type UpdateInboxDraftResponse =
  Response<UpdateInboxDraftResponseSuccess>;
