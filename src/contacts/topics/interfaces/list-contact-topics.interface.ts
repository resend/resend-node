import type { GetOptions } from '../../../common/interfaces';
import type {
  PaginatedData,
  PaginationOptions,
} from '../../../common/interfaces/pagination-options.interface';
import type { ErrorResponse } from '../../../interfaces';

interface ListContactTopicsBaseOptions {
  id?: string;
  email?: string;
}

export type ListContactTopicsOptions = ListContactTopicsBaseOptions &
  PaginationOptions;

export interface ListContactTopicsRequestOptions extends GetOptions {}

export interface ContactTopic {
  id: string;
  name: string;
  description: string | null;
  subscription: 'opt_in' | 'opt_out';
}

export type ListContactTopicsResponseSuccess = PaginatedData<ContactTopic[]>;

export type ListContactTopicsResponse =
  | {
      data: ListContactTopicsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
