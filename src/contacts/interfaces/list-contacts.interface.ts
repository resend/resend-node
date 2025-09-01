import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Contact } from './contact';

export type ListContactsOptions = {
  audienceId: string;
} & PaginationOptions;

export interface ListContactsResponseSuccess {
  object: 'list';
  data: Contact[];
  has_more: boolean;
}

export type ListContactsResponse = Response<ListContactsResponseSuccess>;
