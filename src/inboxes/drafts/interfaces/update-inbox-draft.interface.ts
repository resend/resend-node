import type { RequireAtLeastOne } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxDraft } from './draft';

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
}>;

export type UpdateInboxDraftResponseSuccess = InboxDraft;

export type UpdateInboxDraftResponse =
  Response<UpdateInboxDraftResponseSuccess>;
