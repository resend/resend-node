import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxDraft } from './draft';

export type GetInboxDraftOptions = InboxSelector & {
  draftId: string;
};

export type GetInboxDraftResponseSuccess = InboxDraft;

export type GetInboxDraftResponse = Response<GetInboxDraftResponseSuccess>;
