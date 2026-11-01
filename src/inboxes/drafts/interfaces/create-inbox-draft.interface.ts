import type {
  PostOptions,
  RequireAtLeastOne,
} from '../../../common/interfaces';
import type { IdempotentRequest } from '../../../common/interfaces/idempotent-request.interface';
import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxDraftAttachmentOptions } from './draft';

type CreateInboxDraftContent = RequireAtLeastOne<{
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
   */
  attachments?: InboxDraftAttachmentOptions[];
}>;

export type CreateInboxDraftOptions = InboxSelector &
  CreateInboxDraftContent &
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

export interface CreateInboxDraftRequestOptions
  extends PostOptions,
    IdempotentRequest {}

export interface CreateInboxDraftResponseSuccess {
  object: 'inbox_draft';
  id: string;
}

export type CreateInboxDraftResponse =
  Response<CreateInboxDraftResponseSuccess>;
