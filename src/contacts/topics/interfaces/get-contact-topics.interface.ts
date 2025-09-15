import type { GetOptions } from '../../../common/interfaces';
import { PaginatedApiResponse, PaginatedData, PaginationOptions } from '../../../common/interfaces/pagination';
import type { ErrorResponse } from '../../../interfaces';

interface GetContactTopicsBaseOptions {
  id?: string;
  email?: string;
}

export type GetContactTopicsOptions = GetContactTopicsBaseOptions & PaginationOptions<string>;

export interface GetContactTopicsRequestOptions extends GetOptions {}

export interface ContactTopic {
  id: string;
  name: string;
  description: string | null;
  subscription: 'opt_in' | 'opt_out';
}

export type GetContactTopicsResponseSuccess = PaginatedApiResponse<{
  email: string;
  topics: ContactTopic[];
}>


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

