import type { GetOptions } from '../../../common/interfaces';
import type { ErrorResponse } from '../../../interfaces';

interface GetContactTopicsBaseOptions {
  id?: string;
  email?: string;
}

export interface GetContactTopicsOptions extends GetContactTopicsBaseOptions {}

export interface GetContactTopicsRequestOptions extends GetOptions {}

export interface ContactTopic {
  id: string;
  subscription: 'opt_in' | 'opt_out';
}

export interface GetContactTopicsResponseSuccess {
  email: string;
  topics: ContactTopic[];
}

export interface GetContactTopicsResponse {
  data: GetContactTopicsResponseSuccess | null;
  error: ErrorResponse | null;
}
