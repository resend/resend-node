import { ErrorResponse } from '../../interfaces';

export interface RemoveApiKeyResponseSuccess {
  id: string;
}

export interface RemoveApiKeyResponse {
  data: RemoveApiKeyResponseSuccess | null;
  error: ErrorResponse | null;
}
