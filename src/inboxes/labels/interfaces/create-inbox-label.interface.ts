import type { PostOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxLabelColor } from '../../interfaces/inbox';

export interface CreateInboxLabelOptions {
  inboxId: string;
  name: string;
  color?: InboxLabelColor;
}

export interface CreateInboxLabelRequestOptions extends PostOptions {}

export interface CreateInboxLabelResponseSuccess {
  object: 'inbox_label';
  id: string;
}

export type CreateInboxLabelResponse =
  Response<CreateInboxLabelResponseSuccess>;
