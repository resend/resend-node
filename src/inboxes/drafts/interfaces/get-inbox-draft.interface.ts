import type { Response } from '../../../interfaces';
import type { InboxDraft } from './draft';

export type GetInboxDraftResponseSuccess = InboxDraft;

export type GetInboxDraftResponse = Response<GetInboxDraftResponseSuccess>;
