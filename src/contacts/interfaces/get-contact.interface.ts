import type { ErrorResponse } from '../../interfaces';
import type { Contact, SelectingField } from './contact';

export type GetContactOptions = {
  audienceId: string;
} & SelectingField;

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
