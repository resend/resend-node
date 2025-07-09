import type { PatchOptions } from '../../../common/interfaces/patch-option.interface';
import type { ErrorResponse } from '../../../interfaces';

interface UpdateContactTopicsBaseOptions {
  id?: string;
  email?: string;
}

export interface UpdateContactTopicsOptions
  extends UpdateContactTopicsBaseOptions {
  opt_in?: string | string[];
  opt_out?: string | string[];
}

export interface UpdateContactTopicsRequestOptions extends PatchOptions {}

export interface UpdateContactTopicsResponseSuccess {
  id: string;
}

export interface UpdateContactTopicsResponse {
  data: UpdateContactTopicsResponseSuccess | null;
  error: ErrorResponse | null;
}
