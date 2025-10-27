import type { Response } from '../../interfaces';
import type { ContactProperty } from './contact-property';

// SDK options
type StringBaseContactPropertyOptions = {
  type: 'string';
  fallbackValue?: string | null;
};

type NumberBaseContactPropertyOptions = {
  type: 'number';
  fallbackValue?: number | null;
};

export type CreateContactPropertyOptions = {
  key: string;
} & (StringBaseContactPropertyOptions | NumberBaseContactPropertyOptions);

// API options
export interface CreateContactPropertyApiOptions {
  key: string;
  type: 'string' | 'number';
  fallback_value?: string | number | null;
}

export type CreateContactPropertyResponseSuccess = Pick<
  ContactProperty,
  'id' | 'object'
>;

export type CreateContactPropertyResponse =
  Response<CreateContactPropertyResponseSuccess>;
