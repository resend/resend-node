import type { Response } from '../../interfaces';
import type { Contact } from './contact';

export interface ListContactsOptions {
  audienceId: string;
}

export interface ListContactsResponseSuccess {
  object: 'list';
  data: Contact[];
}

export type ListContactsResponse = Response<ListContactsResponseSuccess>;
