import type { Response } from '../../../interfaces';

export interface RemoveInboxDraftOptions {
  inboxId: string;
  draftId: string;
}

export interface RemoveInboxDraftResponseSuccess {
  object: 'inbox_draft';
  id: string;
  deleted: boolean;
}

export type RemoveInboxDraftResponse =
  Response<RemoveInboxDraftResponseSuccess>;
