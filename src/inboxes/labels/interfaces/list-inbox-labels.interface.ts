import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxLabel } from './label';

export type ListInboxLabelsOptions = InboxSelector;

export interface ListInboxLabelsResponseSuccess {
  object: 'list';
  data: InboxLabel[];
}

export type ListInboxLabelsResponse = Response<ListInboxLabelsResponseSuccess>;
