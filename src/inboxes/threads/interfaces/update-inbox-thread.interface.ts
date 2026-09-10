import type { RequireAtLeastOne } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type {
  InboxMessageFolder,
  MoveThreadFolder,
} from '../../interfaces/inbox';
import type { InboxThreadLabel } from './thread';

export type UpdateInboxThreadOptions = {
  inboxId: string;
  threadId: string;
} & RequireAtLeastOne<{
  read?: boolean;
  folder?: MoveThreadFolder;
  labelId?: string;
}>;

export interface UpdateInboxThreadResponseSuccess {
  object: 'inbox';
  id: string;
  subject: string | null;
  folder: InboxMessageFolder;
  labels: InboxThreadLabel[];
  read: boolean;
}

export type UpdateInboxThreadResponse =
  Response<UpdateInboxThreadResponseSuccess>;
