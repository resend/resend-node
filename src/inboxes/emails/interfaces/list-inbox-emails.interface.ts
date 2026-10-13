import type { PaginationOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxMessage } from '../../threads/interfaces';

export type ListInboxEmailsOptions = {
  inboxId: string;
} & PaginationOptions;

export interface ListInboxEmailsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: InboxMessage[];
}

export type ListInboxEmailsResponse =
  Response<ListInboxEmailsResponseSuccess>;
