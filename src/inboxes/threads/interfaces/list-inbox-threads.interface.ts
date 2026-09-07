import type { Response } from '../../../interfaces';
import type { InboxMessageFolder } from '../../interfaces/inbox';
import type { InboxThread } from './thread';

export interface ListInboxThreadsOptions {
  folder?: InboxMessageFolder;
  query?: string;
  from?: string;
  label?: string | string[];
  cursor?: string;
}

export interface ListInboxThreadsResponseSuccess {
  object: 'list';
  has_more: boolean;
  next_cursor: string | null;
  data: InboxThread[];
}

export type ListInboxThreadsResponse =
  Response<ListInboxThreadsResponseSuccess>;
