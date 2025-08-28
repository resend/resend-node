import type { Response } from '../../interfaces';
import type { GetEmailResponseSuccess } from './get-email-options.interface';

// Pagination options using cursor-based approach
export type ListEmailsOptions = {
  /**
   * Maximum number of emails to return (1-100, default: 20)
   */
  limit?: number;
} & (
  | {
      /**
       * Get emails after this cursor (cannot be used with 'before')
       */
      after?: string;
    }
  | {
      /**
       * Get emails before this cursor (cannot be used with 'after')
       */
      before?: string;
    }
);

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
