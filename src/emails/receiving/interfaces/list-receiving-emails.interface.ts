import type { PaginationOptions } from '../../../common/interfaces';
import type { ErrorResponse } from '../../../interfaces';
import type { GetReceivingEmailResponseSuccess } from './get-receiving-email.interface';

export type ListReceivingEmailsOptions = PaginationOptions & {
  /** Only return emails received by one of these addresses (exact, case-sensitive match, up to 20). */
  to?: string[];
  /** Inclusive lower bound on `created_at`. ISO 8601 date or datetime, read as UTC without an offset. */
  startDate?: string;
  /** Upper bound on `created_at`. A bare date (`YYYY-MM-DD`) covers that whole day. */
  endDate?: string;
};

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
  | {
      data: ListReceivingEmailsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
