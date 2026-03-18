import type { PostOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Contact } from './contact';

interface CreateContactPropertiesOptions {
  [key: string]: string | number | null;
}

export interface LegacyCreateContactOptions {
  /**
   * @deprecated Use `segments` instead to add one or more segments to the new contact
   *
   * @see https://resend.com/docs/dashboard/segments/migrating-from-audiences-to-segments
   */
  audienceId: string;
  email: string;
  unsubscribed?: boolean;
  firstName?: string;
  lastName?: string;
  properties?: CreateContactPropertiesOptions;
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
}

export interface CreateContactRequestOptions extends PostOptions {}

export interface CreateContactResponseSuccess extends Pick<Contact, 'id'> {
  object: 'contact';
}

export type CreateContactResponse = Response<CreateContactResponseSuccess>;
