import type { ErrorResponse } from '../../interfaces';
import type { ApiContactProperty, ContactProperty } from './contact-property';

export type GetContactPropertyResponseSuccess = ApiContactProperty;

export type GetContactPropertyResponse =
  | {
      data: ContactProperty;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
