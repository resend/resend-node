import type { PostOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxLabelColor, InboxSelector } from '../../interfaces/inbox';

export type CreateInboxLabelOptions = InboxSelector & {
  name: string;
  color?: InboxLabelColor;
};

export interface CreateInboxLabelRequestOptions extends PostOptions {}

export interface CreateInboxLabelResponseSuccess {
  object: 'inbox_label';
  id: string;
}

export type CreateInboxLabelResponse =
  Response<CreateInboxLabelResponseSuccess>;
