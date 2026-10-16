import type { RequireAtLeastOne } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxSelector, MoveThreadFolder } from '../../interfaces/inbox';
import type { InboxThreadSummary } from './thread';

export type UpdateInboxThreadOptions = InboxSelector & {
  threadId: string;
} & RequireAtLeastOne<{
    read?: boolean;
    folder?: MoveThreadFolder;
  }>;

export type UpdateInboxThreadResponseSuccess = InboxThreadSummary;

export type UpdateInboxThreadResponse =
  Response<UpdateInboxThreadResponseSuccess>;
