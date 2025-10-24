import type { Response } from '../../interfaces';
import type { Contact, SelectingField } from './contact';

export type UpdateContactOptions = {
  audienceId?: string;
  unsubscribed?: boolean;
  firstName?: string;
  lastName?: string;
} & SelectingField;

export type UpdateContactResponseSuccess = Pick<Contact, 'id'> & {
  object: 'contact';
};

export type UpdateContactResponse = Response<UpdateContactResponseSuccess>;
