// list-contacts.interface.ts
import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Contact } from './contact';

export type ListAudienceContactsOptions = {
  audienceId: string;
} & PaginationOptions;

export type ListContactsOptions = PaginationOptions & {
  audienceId?: string;
};

export interface ListContactsResponseSuccess {
  object: 'list';
  data: Contact[];
  has_more: boolean;
}

export type ListContactsResponse = Response<ListContactsResponseSuccess>;
