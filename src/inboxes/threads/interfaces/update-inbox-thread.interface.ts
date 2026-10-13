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
  /** Label IDs to apply to the thread. Between 1 and 10 IDs. */
  addLabelIds?: string[];
  /** Label IDs to remove from the thread. Between 1 and 10 IDs. The labels themselves are kept. */
  removeLabelIds?: string[];
}>;

export type UpdateInboxThreadResponseSuccess = InboxThreadSummary;

export type UpdateInboxThreadResponse =
  Response<UpdateInboxThreadResponseSuccess>;
