import type { Response } from '../../../interfaces';
import type { InboxDraft } from './draft';

export interface GetInboxDraftOptions {
  inboxId: string;
  draftId: string;
}

export type GetInboxDraftResponseSuccess = InboxDraft;

export type GetInboxDraftResponse = Response<GetInboxDraftResponseSuccess>;
