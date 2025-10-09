import type { PaginationOptions } from '../../../common/interfaces';
import type { ErrorResponse } from '../../../interfaces';
import type { GetInboundEmailResponseSuccess } from './get-inbound-email.interface';

export type ListInboundEmailsOptions = PaginationOptions;

export type ListInboundEmail = Omit<
  GetInboundEmailResponseSuccess,
  'html' | 'text' | 'headers' | 'object'
>;

export interface ListInboundEmailsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: ListInboundEmail[];
}

export type ListInboundEmailsResponse =
  | {
      data: ListInboundEmailsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
