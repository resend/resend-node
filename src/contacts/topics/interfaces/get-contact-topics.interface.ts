import type { GetOptions } from '../../../common/interfaces';
import type {
  PaginatedData,
  PaginationOptions,
} from '../../../common/interfaces/pagination-options.interface';
import type { ErrorResponse } from '../../../interfaces';

interface GetContactTopicsBaseOptions {
  id?: string;
  email?: string;
}

export type GetContactTopicsOptions = GetContactTopicsBaseOptions &
  PaginationOptions;

export interface GetContactTopicsRequestOptions extends GetOptions {}

export interface ContactTopic {
  id: string;
  name: string;
  description: string | null;
  subscription: 'opt_in' | 'opt_out';
}

export type GetContactTopicsResponseSuccess = PaginatedData<{
  email: string;
  topics: ContactTopic[];
}>;

export type GetContactTopicsResponse =
  | {
      data: PaginatedData<{
        email: string;
        topics: ContactTopic[];
      }>;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
