import type { RequireAtLeastOne } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type {
  InboxMessageFolder,
  MoveThreadFolder,
} from '../../interfaces/inbox';
import type { InboxThreadLabel } from './thread';

export type UpdateInboxThreadOptions = RequireAtLeastOne<{
  read?: boolean;
  folder?: MoveThreadFolder;
  label_id?: string;
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
