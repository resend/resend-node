import { ErrorResponse } from '../../interfaces';

export interface ListApiKeysResponseSuccess {
  name: string;
  id: string;
  created_at: string;
}

export interface ListApiKeysResponse {
  data: ListApiKeysResponseSuccess[] | null;
  error: ErrorResponse | null;
}
