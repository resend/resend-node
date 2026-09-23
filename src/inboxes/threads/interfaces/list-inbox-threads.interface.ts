import type { PaginationOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxMessageFolder } from '../../interfaces/inbox';
import type { InboxThread } from './thread';

export type ListInboxThreadsOptions = {
  inboxId: string;
  folder?: InboxMessageFolder;
  query?: string;
  from?: string;
  label?: string | string[];
} & PaginationOptions;

export interface ListInboxThreadsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: InboxThread[];
}

export type ListInboxThreadsResponse =
  Response<ListInboxThreadsResponseSuccess>;
