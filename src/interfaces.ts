import type { RateLimit } from './rate-limiting';

export const RESEND_ERROR_CODES_BY_KEY = {
  missing_required_field: 422,
  invalid_idempotency_key: 400,
  invalid_idempotent_request: 409,
  concurrent_idempotent_requests: 409,
  invalid_access: 422,
  invalid_parameter: 422,
  invalid_region: 422,
  rate_limit_exceeded: 429,
  missing_api_key: 401,
  invalid_api_Key: 403,
  invalid_from_address: 403,
  validation_error: 403,
  not_found: 404,
  method_not_allowed: 405,
  application_error: 500,
  internal_server_error: 500,
} as const;

export type RESEND_ERROR_CODE_KEY = keyof typeof RESEND_ERROR_CODES_BY_KEY;

export type ErrorResponse =
  | {
      message: string;
      name: Exclude<RESEND_ERROR_CODE_KEY, 'rate_limit_exceeded'>;
    }
  | {
      message: string;
      name: Extract<RESEND_ERROR_CODE_KEY, 'rate_limit_exceeded'>;
      /**
        * Time in seconds.
        */
      retryAfter: number;
    };

export type Response<Data> =
  | {
      data: Data;
      rateLimiting: RateLimit;
      error: null;
    }
  | {
      data: null;
      rateLimiting: RateLimit | null;
      error: ErrorResponse;
    };

export type Tag = { name: string; value: string };
