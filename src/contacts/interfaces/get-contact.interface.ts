import { ErrorResponse } from '../../interfaces';
import { Contact } from './contact';

export interface GetContactOptions {
  audienceId: string;
  id: string;
}

export interface GetContactResponseSuccess
  extends Pick<
    Contact,
    'id' | 'email' | 'created_at' | 'first_name' | 'last_name' | 'unsubscribed'
  > {
  object: 'contact';
}

export interface GetContactResponse {
  data: GetContactResponseSuccess | null;
  error: ErrorResponse | null;
}
