import type { Response } from '../../interfaces';

// biome-ignore lint/complexity/noBannedTypes: allow empty types
export type RemoveApiKeyResponseSuccess = {};

export type RemoveApiKeyResponse = Response<RemoveApiKeyResponseSuccess>;
