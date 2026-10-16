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
   * Files to store on the draft. Each one needs `content`, `filename` and `contentType`.
   * The files on a draft can total at most 25 MB. An empty file or a blocked file type returns a 422.
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
