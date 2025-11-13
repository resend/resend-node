import type { Response } from '../../interfaces';
import type { ApiContactProperty, ContactProperty } from './contact-property';

export type GetContactPropertyResponseSuccess = ApiContactProperty & {
  object: 'contact_property';
};

export type GetContactPropertyResponse = Response<
  ContactProperty & {
    object: 'contact_property';
  }
>;
