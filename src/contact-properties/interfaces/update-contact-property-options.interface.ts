import type { Response } from '../../interfaces';
import type { ContactProperty } from './contact-property';

// SDK options
export type UpdateContactPropertyOptions = {
  id: string;
  fallbackValue?: string | number | null;
};

// API options
export interface UpdateContactPropertyApiOptions {
  fallback_value?: string | number | null;
}

export type UpdateContactPropertyResponseSuccess = Pick<
  ContactProperty,
  'id' | 'object'
>;

export type UpdateContactPropertyResponse =
  Response<UpdateContactPropertyResponseSuccess>;
