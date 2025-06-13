import type { ErrorResponse } from '../../interfaces';
import type { Contact } from './contact';

export interface GetContactOptions {
  audienceId: string;
  id?: string;
  email?: string;
}

export interface GetContactResponseSuccess
  extends Pick<
    Contact,
    'id' | 'email' | 'created_at' | 'first_name' | 'last_name' | 'unsubscribed'
  > {
  object: 'contact';
}

export type GetContactResponse =
  | {
      data: GetContactResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
