import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { GetEmailResponseSuccess } from './get-email-options.interface';

export type ListEmailsOptions = PaginationOptions;

// Base email type for listing (subset of full email)
export type ListEmail = Omit<
  GetEmailResponseSuccess,
  'html' | 'text' | 'tags' | 'object'
>;

export type ListEmailsResponseSuccess = {
  object: 'list';
  has_more: boolean;
  data: ListEmail[];
};

export type ListEmailsResponse = Response<ListEmailsResponseSuccess>;
