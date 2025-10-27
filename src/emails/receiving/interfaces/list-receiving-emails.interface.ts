import type { PaginationOptions } from '../../../common/interfaces';
import type { ErrorResponse } from '../../../interfaces';
import type { GetReceivingEmailResponseSuccess } from './get-receiving-email.interface';

export type ListReceivingEmailsOptions = PaginationOptions;

export type ListReceivingEmail = Omit<
  GetReceivingEmailResponseSuccess,
  'html' | 'text' | 'headers' | 'object'
>;

export interface ListReceivingEmailsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: ListReceivingEmail[];
}

export type ListReceivingEmailsResponse =
  | {
      data: ListReceivingEmailsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
