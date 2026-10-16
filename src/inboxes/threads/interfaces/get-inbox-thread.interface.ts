import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxThreadSummary } from './thread';

export type GetInboxThreadOptions = InboxSelector & {
  threadId: string;
};

export type GetInboxThreadResponseSuccess = InboxThreadSummary;

export type GetInboxThreadResponse = Response<GetInboxThreadResponseSuccess>;
