import { ErrorResponse } from '../../interfaces';
import { Contact } from './contact';

export interface UpdateContactOptions {
  id: string;
  audience_id: string;
  unsubscribed?: boolean;
  first_name?: string;
  last_name?: string;
}

export type UpdateContactResponseSuccess = Pick<Contact, 'id'>;

export interface UpdateContactResponse {
  data: UpdateContactResponseSuccess | null;
  error: ErrorResponse | null;
}
