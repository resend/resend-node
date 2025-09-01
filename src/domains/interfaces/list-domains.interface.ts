import type { Response } from '../../interfaces';
import type { Domain } from './domain';

// Pagination options using cursor-based approach
export type ListDomainsOptions = {
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

export type ListDomainsResponseSuccess = {
  data: Domain[];
  object: 'list';
  has_more: boolean;
};

export type ListDomainsResponse = Response<ListDomainsResponseSuccess>;
