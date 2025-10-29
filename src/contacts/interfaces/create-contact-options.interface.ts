import type { PostOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Contact } from './contact';

interface CreateContactPropertiesOptions {
  [key: string]: string | number | null;
}

export interface CreateContactOptions {
  audienceId?: string;
  email: string;
  unsubscribed?: boolean;
  firstName?: string;
  lastName?: string;
  properties?: CreateContactPropertiesOptions;
}

export interface CreateContactRequestOptions extends PostOptions {}

export interface CreateContactResponseSuccess extends Pick<Contact, 'id'> {
  object: 'contact';
}

export type CreateContactResponse = Response<CreateContactResponseSuccess>;
