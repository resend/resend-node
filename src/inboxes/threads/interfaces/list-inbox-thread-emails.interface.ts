import type { PaginationOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxMessage } from './thread';

export type ListInboxThreadEmailsOptions = {
  inboxId: string;
  threadId: string;
} & PaginationOptions;

export interface ListInboxThreadEmailsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: InboxMessage[];
}

export type ListInboxThreadEmailsResponse =
  Response<ListInboxThreadEmailsResponseSuccess>;
