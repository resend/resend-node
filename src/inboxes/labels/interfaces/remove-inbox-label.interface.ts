import type { Response } from '../../../interfaces';

export interface RemoveInboxLabelResponseSuccess {
  object: 'inbox_label';
  id: string;
  deleted: boolean;
}

export type RemoveInboxLabelResponse =
  Response<RemoveInboxLabelResponseSuccess>;
