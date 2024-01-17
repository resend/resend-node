import { PostOptions } from '../../common/interfaces';
import { ErrorResponse } from '../../interfaces';
import { Contact } from './contact';

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

export interface CreateContactResponse {
  data: CreateContactResponseSuccess | null;
  error: ErrorResponse | null;
}
