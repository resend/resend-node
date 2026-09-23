import type { Response } from '../../../interfaces';
import type { InboxLabel } from './label';

export interface ListInboxLabelsOptions {
  inboxId: string;
}

export interface ListInboxLabelsResponseSuccess {
  object: 'list';
  data: InboxLabel[];
}

export type ListInboxLabelsResponse = Response<ListInboxLabelsResponseSuccess>;
