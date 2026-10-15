import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxThreadLabelList } from './thread';

export type AddInboxThreadLabelsOptions = InboxSelector & {
  threadId: string;
  /** Between 1 and 10 label IDs. */
  labels: string[];
};

export type AddInboxThreadLabelsResponseSuccess = InboxThreadLabelList;

export type AddInboxThreadLabelsResponse =
  Response<AddInboxThreadLabelsResponseSuccess>;
