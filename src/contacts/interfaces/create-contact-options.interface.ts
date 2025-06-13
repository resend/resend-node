import type { PostOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';
import type { Contact } from './contact';

export interface CreateContactOptions {
  audienceId: string;
  email: string;
  unsubscribed?: boolean;
  firstName?: string;
  lastName?: string;
}

export interface CreateContactRequestOptions extends PostOptions {}

export interface CreateContactResponseSuccess extends Pick<Contact, 'id'> {
  object: 'contact';
}

export type CreateContactResponse =
  | {
      data: CreateContactResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
