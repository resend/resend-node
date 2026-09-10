import type { Response } from '../../../interfaces';

export interface RemoveInboxLabelOptions {
  inboxId: string;
  labelId: string;
}

export interface RemoveInboxLabelResponseSuccess {
  object: 'inbox_label';
  id: string;
  deleted: boolean;
}

export type RemoveInboxLabelResponse =
  Response<RemoveInboxLabelResponseSuccess>;
