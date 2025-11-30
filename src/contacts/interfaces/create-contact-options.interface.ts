import type { PostOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Contact } from './contact';

interface CreateContactPropertiesOptions {
  [key: string]: string | number | null;
}

export interface LegacyCreateContactOptions {
  /**
   * @deprecated Use `segments` instead to add one or more segments to the new contact
   */
  audienceId: string;
  email: string;
  unsubscribed?: boolean;
  firstName?: string;
  lastName?: string;
  properties?: CreateContactPropertiesOptions;
  segments?: never;
  topics?: never;
}

export interface CreateContactOptions {
  email: string;
  unsubscribed?: boolean;
  firstName?: string;
  lastName?: string;
  properties?: CreateContactPropertiesOptions;
  segments?: {
    id: string;
  }[];
  topics?: {
    id: string;
    subscription: 'opt_in' | 'opt_out';
  }[];
  /**
   * @deprecated Use `segments` instead to add one or more segments to the new contact
   */
  audienceId?: never;
}

export interface CreateContactRequestOptions extends PostOptions {}

export interface CreateContactResponseSuccess extends Pick<Contact, 'id'> {
  object: 'contact';
}

export type CreateContactResponse = Response<CreateContactResponseSuccess>;
