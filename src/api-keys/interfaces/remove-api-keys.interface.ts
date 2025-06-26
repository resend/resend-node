import type { ErrorResponse } from '../../interfaces';

// biome-ignore lint/complexity/noBannedTypes: allow empty types
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
