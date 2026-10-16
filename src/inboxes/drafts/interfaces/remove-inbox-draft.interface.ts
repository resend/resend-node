import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';

export type RemoveInboxDraftOptions = InboxSelector & {
  draftId: string;
};

export interface RemoveInboxDraftResponseSuccess {
  object: 'inbox_draft';
  id: string;
  deleted: boolean;
}

export type RemoveInboxDraftResponse =
  Response<RemoveInboxDraftResponseSuccess>;
