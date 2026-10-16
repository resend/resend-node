import type { Response } from '../../../interfaces';
import type { ListInboxThreadsOptions } from './list-inbox-threads.interface';
import type { InboxThread } from './thread';

export type SearchInboxThreadsOptions = ListInboxThreadsOptions & {
  query?: string;
  from?: string[];
  to?: string[];
  cc?: string[];
  bcc?: string[];
  hasAttachment?: boolean;
  startDate?: string;
  endDate?: string;
};

export interface InboxThreadSearchResult extends InboxThread {
  matched_email_id: string | null;
}

export interface SearchInboxThreadsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: InboxThreadSearchResult[];
}

export type SearchInboxThreadsResponse =
  Response<SearchInboxThreadsResponseSuccess>;
