import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxThreadLabelList } from './thread';

export type SetInboxThreadLabelsOptions = InboxSelector & {
  threadId: string;
  labels: string[];
};

export type SetInboxThreadLabelsResponseSuccess = InboxThreadLabelList;

export type SetInboxThreadLabelsResponse =
  Response<SetInboxThreadLabelsResponseSuccess>;
