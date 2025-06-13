import type { ErrorResponse } from '../../interfaces';
import type { Contact } from './contact';

export interface ListContactsOptions {
  audienceId: string;
}

export interface ListContactsResponseSuccess {
  object: 'list';
  data: Contact[];
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
