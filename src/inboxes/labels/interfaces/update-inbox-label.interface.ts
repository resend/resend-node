import type { Response } from '../../../interfaces';
import type { InboxLabelColor, InboxSelector } from '../../interfaces/inbox';

export type UpdateInboxLabelOptions = InboxSelector & {
  labelId: string;
  name?: string;
  color?: InboxLabelColor;
};

export interface UpdateInboxLabelResponseSuccess {
  object: 'inbox_label';
  id: string;
}

export type UpdateInboxLabelResponse =
  Response<UpdateInboxLabelResponseSuccess>;
