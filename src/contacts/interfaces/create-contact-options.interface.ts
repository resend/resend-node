import { PostOptions } from '../../common/interfaces';
import { ErrorResponse } from '../../interfaces';
import { Contact } from './contact';

export interface CreateContactOptions {
  audience_id: string;
  email: string;
  unsubscribed?: boolean;
  first_name?: string;
  last_name?: string;
}

export interface CreateContactRequestOptions extends PostOptions {}

export interface CreateContactResponseSuccess
  extends Pick<Contact, 'name' | 'id' | 'created_at'> {}

export interface CreateContactResponse {
  data: CreateContactResponseSuccess | null;
  error: ErrorResponse | null;
}
