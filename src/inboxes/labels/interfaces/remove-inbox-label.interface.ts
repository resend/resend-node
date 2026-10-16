import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';

export type RemoveInboxLabelOptions = InboxSelector & {
  labelId: string;
};

export interface RemoveInboxLabelResponseSuccess {
  object: 'inbox_label';
  id: string;
  deleted: boolean;
}

export type RemoveInboxLabelResponse =
  Response<RemoveInboxLabelResponseSuccess>;
