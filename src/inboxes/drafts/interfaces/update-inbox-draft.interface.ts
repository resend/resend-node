import type { RequireAtLeastOne } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxDraft, InboxDraftAttachmentOptions } from './draft';

export type UpdateInboxDraftOptions = InboxSelector & {
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
     * The files on a draft can total at most 25 MB. An empty file or a blocked file type returns a 422.
     * Sending the field replaces every attachment on the draft. Send `[]` or `null` to remove them all.
     */
    attachments?: InboxDraftAttachmentOptions[] | null;
  }>;

export type UpdateInboxDraftResponseSuccess = InboxDraft;

export type UpdateInboxDraftResponse =
  Response<UpdateInboxDraftResponseSuccess>;
