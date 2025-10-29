import type { Response } from '../../interfaces';
import type { Contact, SelectingField } from './contact';

interface UpdateContactPropertiesOptions {
  [key: string]: string | number | null;
}

export type UpdateContactOptions = {
  audienceId?: string;
  unsubscribed?: boolean;
  firstName?: string;
  lastName?: string;
  properties?: UpdateContactPropertiesOptions;
} & SelectingField;

export type UpdateContactResponseSuccess = Pick<Contact, 'id'> & {
  object: 'contact';
};

export type UpdateContactResponse = Response<UpdateContactResponseSuccess>;
