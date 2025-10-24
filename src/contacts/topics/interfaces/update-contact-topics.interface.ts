import type { PatchOptions } from '../../../common/interfaces/patch-option.interface';
import type { Response } from '../../../interfaces';

interface UpdateContactTopicsBaseOptions {
  id?: string;
  email?: string;
}

export interface UpdateContactTopicsOptions
  extends UpdateContactTopicsBaseOptions {
  topics: { id: string; subscription: 'opt_in' | 'opt_out' }[];
}

export interface UpdateContactTopicsRequestOptions extends PatchOptions {}

export interface UpdateContactTopicsResponseSuccess {
  id: string;
}

export type UpdateContactTopicsResponse =
  Response<UpdateContactTopicsResponseSuccess>;
