import { ErrorResponse } from '../../interfaces';
import { Contact } from './contact';

export interface ListContactsOptions {
  audienceId: string;
}

export interface ListContactsResponseSuccess {
  object: 'list';
  data: Contact[];
}

export interface ListContactsResponse {
  data: ListContactsResponseSuccess | null;
  error: ErrorResponse | null;
}
