import { ErrorResponse } from '../../interfaces';
import { Contact } from './contact';

export interface UpdateContactOptions {
  id: string;
  audienceId: string;
  unsubscribed?: boolean;
  fistName?: string;
  lastName?: string;
}

export type UpdateContactResponseSuccess = Pick<Contact, 'id'>;

export interface UpdateContactResponse {
  data: UpdateContactResponseSuccess | null;
  error: ErrorResponse | null;
}
