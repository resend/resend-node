import type { Response } from '../../interfaces';
import type { ApiContactProperty, ContactProperty } from './contact-property';

export type GetContactPropertyResponseSuccess = ApiContactProperty;

export type GetContactPropertyResponse = Response<ContactProperty>;
