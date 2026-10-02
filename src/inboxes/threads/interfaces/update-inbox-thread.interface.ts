import type { RequireAtLeastOne } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { MoveThreadFolder } from '../../interfaces/inbox';
import type { InboxThreadSummary } from './thread';

export type UpdateInboxThreadOptions = {
  inboxId: string;
  threadId: string;
} & RequireAtLeastOne<{
  read?: boolean;
  folder?: MoveThreadFolder;
  /** Applies the label to the thread. Labels cannot be removed through this endpoint. */
  labelId?: string;
}>;

export type UpdateInboxThreadResponseSuccess = InboxThreadSummary;

export type UpdateInboxThreadResponse =
  Response<UpdateInboxThreadResponseSuccess>;
