import type { ErrorResponse } from '../../interfaces';

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type RemoveApiKeyResponseSuccess = {};

export interface RemoveApiKeyResponse {
  data: RemoveApiKeyResponseSuccess | null;
  error: ErrorResponse | null;
}
