import type { ErrorResponse } from '../../interfaces';
import type { Contact } from './contact';

interface UpdateContactBaseOptions {
  id?: string;
  email?: string;
}

export interface UpdateContactOptions extends UpdateContactBaseOptions {
  audienceId: string;
  unsubscribed?: boolean;
  firstName?: string;
  lastName?: string;
}

export type UpdateContactResponseSuccess = Pick<Contact, 'id'> & {
  object: 'contact';
};

export type UpdateContactResponse =
  | {
      data: UpdateContactResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
