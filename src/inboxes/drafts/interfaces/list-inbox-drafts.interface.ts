import type { Response } from '../../../interfaces';
import type { InboxDraftListItem } from './draft';

export interface ListInboxDraftsOptions {
  cursor?: string;
}

export interface ListInboxDraftsResponseSuccess {
  object: 'list';
  has_more: boolean;
  next_cursor: string | null;
  data: InboxDraftListItem[];
}

export type ListInboxDraftsResponse = Response<ListInboxDraftsResponseSuccess>;
