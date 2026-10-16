import type { PaginationOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxDraftListItem } from './draft';

export type ListInboxDraftsOptions = InboxSelector & PaginationOptions;

export interface ListInboxDraftsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: InboxDraftListItem[];
}

export type ListInboxDraftsResponse = Response<ListInboxDraftsResponseSuccess>;
