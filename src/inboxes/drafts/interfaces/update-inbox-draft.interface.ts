import type { RequireAtLeastOne } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxDraftAttachmentOptions } from './draft';

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
     * Files to store on the draft. Each one needs a `filename` and either `content` with a `contentType`,
     * or a `path` URL that is downloaded when the request is made.
     * The files on a draft, downloaded ones included, can total at most 25 MB. An empty file, a blocked file type,
     * or a `path` that cannot be downloaded returns a 422.
     * Sending the field replaces every attachment on the draft. Send `[]` or `null` to remove them all.
     */
    attachments?: InboxDraftAttachmentOptions[] | null;
  }>;

export interface UpdateInboxDraftResponseSuccess {
  object: 'inbox_draft';
  id: string;
}

export type UpdateInboxDraftResponse =
  Response<UpdateInboxDraftResponseSuccess>;
