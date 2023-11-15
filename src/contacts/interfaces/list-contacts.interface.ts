import { ErrorResponse } from '../../interfaces';
import { Contact } from './contact';

export type ListContactsResponseSuccess = Contact[];

export interface ListContactsResponse {
  data: ListContactsResponseSuccess | null;
  error: ErrorResponse | null;
}
