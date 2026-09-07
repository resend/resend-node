import type { Response } from '../../../interfaces';
import type { InboxLabelColor } from '../../interfaces/inbox';

export interface UpdateInboxLabelOptions {
  name?: string;
  color?: InboxLabelColor;
}

export interface UpdateInboxLabelResponseSuccess {
  object: 'inbox_label';
  id: string;
}

export type UpdateInboxLabelResponse =
  Response<UpdateInboxLabelResponseSuccess>;
