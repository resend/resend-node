import type { Response } from '../../interfaces';
import type { Contact, SelectingField } from './contact';

interface UpdateContactPropertiesOptions {
  [key: string]: string | number | null;
}

export type UpdateContactOptions = {
  audienceId?: string;
  unsubscribed?: boolean;
  /**
   * Use `null` to clear the `firstName`
   */
  firstName?: string | null;
  /**
   * Use `null` to clear the `lastName`
   */
  lastName?: string | null;
  properties?: UpdateContactPropertiesOptions;
} & SelectingField;

export type UpdateContactResponseSuccess = Pick<Contact, 'id'> & {
  object: 'contact';
};

export type UpdateContactResponse = Response<UpdateContactResponseSuccess>;
