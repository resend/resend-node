import type { PaginationOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxMessage } from './thread';

export type ListInboxThreadEmailsOptions = InboxSelector & {
  threadId: string;
} & PaginationOptions;

export interface ListInboxThreadEmailsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: InboxMessage[];
}

export type ListInboxThreadEmailsResponse =
  Response<ListInboxThreadEmailsResponseSuccess>;
