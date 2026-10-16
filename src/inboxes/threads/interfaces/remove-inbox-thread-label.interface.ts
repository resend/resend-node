import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxThreadLabelList } from './thread';

export type RemoveInboxThreadLabelOptions = InboxSelector & {
  threadId: string;
  labelId: string;
};

export type RemoveInboxThreadLabelResponseSuccess = InboxThreadLabelList;

export type RemoveInboxThreadLabelResponse =
  Response<RemoveInboxThreadLabelResponseSuccess>;
