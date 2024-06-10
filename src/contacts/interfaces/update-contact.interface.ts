import type { ErrorResponse } from '../../interfaces';
import type { Contact } from './contact';

export interface UpdateContactOptions {
  id: string;
  audienceId: string;
  unsubscribed?: boolean;
  firstName?: string;
  lastName?: string;
}

export type UpdateContactResponseSuccess = Pick<Contact, 'id'> & {
  object: 'contact';
};

export interface UpdateContactResponse {
  data: UpdateContactResponseSuccess | null;
  error: ErrorResponse | null;
}
