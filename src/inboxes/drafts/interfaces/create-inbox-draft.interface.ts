import type {
  PostOptions,
  RequireAtLeastOne,
} from '../../../common/interfaces';
import type { Response } from '../../../interfaces';

type CreateInboxDraftContent = RequireAtLeastOne<{
  to?: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject?: string | null;
  text?: string | null;
  html?: string | null;
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
