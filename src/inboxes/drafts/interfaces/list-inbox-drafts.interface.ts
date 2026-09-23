import type { PaginationOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxDraftListItem } from './draft';

export type ListInboxDraftsOptions = {
  inboxId: string;
} & PaginationOptions;

export interface ListInboxDraftsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: InboxDraftListItem[];
}

export type ListInboxDraftsResponse = Response<ListInboxDraftsResponseSuccess>;
