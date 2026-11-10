import type { PaginationOptions } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { GetReceivingEmailResponseSuccess } from './get-receiving-email.interface';

export type ListReceivingEmailsOptions = PaginationOptions;

export type ListReceivingEmail = Omit<
  GetReceivingEmailResponseSuccess,
  'html' | 'text' | 'headers' | 'raw' | 'object'
>;

export interface ListReceivingEmailsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: ListReceivingEmail[];
}

export type ListReceivingEmailsResponse =
  Response<ListReceivingEmailsResponseSuccess>;
