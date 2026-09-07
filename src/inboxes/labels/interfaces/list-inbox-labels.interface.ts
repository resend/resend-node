import type { Response } from '../../../interfaces';
import type { InboxLabel } from './label';

export interface ListInboxLabelsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: InboxLabel[];
}

export type ListInboxLabelsResponse = Response<ListInboxLabelsResponseSuccess>;
