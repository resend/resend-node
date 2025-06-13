import type { ErrorResponse } from '../../interfaces';

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type RemoveApiKeyResponseSuccess = {};

export type RemoveApiKeyResponse =
  | {
      data: RemoveApiKeyResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
