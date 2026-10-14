import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Inbox } from './inbox';

export type ListInboxesOptions = PaginationOptions;

export interface ListInboxesResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: Inbox[];
}

export type ListInboxesResponse = Response<ListInboxesResponseSuccess>;
