// list-contacts.interface.ts
import type { PaginationOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';
import type { Contact } from './contact';

export type ListAudienceContactsOptions = {
  audienceId: string;
} & PaginationOptions;

export type ListContactsOptions = PaginationOptions;

export interface ListContactsResponseSuccess {
  object: 'list';
  data: Contact[];
  has_more: boolean;
}

export type ListContactsResponse =
  | {
      data: ListContactsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
