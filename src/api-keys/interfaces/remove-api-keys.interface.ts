import { ErrorResponse } from '../../interfaces';

export interface RemoveApiKeyResponseSuccess {}

export interface RemoveApiKeyResponse {
  data: RemoveApiKeyResponseSuccess | null;
  error: ErrorResponse | null;
}
