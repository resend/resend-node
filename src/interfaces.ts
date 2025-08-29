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

export type StandardErrorResponse = {
  [K in Exclude<RESEND_ERROR_CODE_KEY, 'rate_limit_exceeded'>]: {
    message: string;
    name: K;
    statusCode: (typeof RESEND_ERROR_CODES_BY_KEY)[K];
  };
}[Exclude<RESEND_ERROR_CODE_KEY, 'rate_limit_exceeded'>];

export type RateLimitErrorResponse = {
  message: string;
  name: 'rate_limit_exceeded';
  retryAfter: number;
  statusCode: (typeof RESEND_ERROR_CODES_BY_KEY)['rate_limit_exceeded'];
};

/**
 * Union type representing all possible error responses from the Resend API
 *
 * @example
 * ```typescript
 * // Standard error
 * const error: ErrorResponse = {
 *   message: "Invalid email address",
 *   statusCode: 422,
 *   name: "validation_error"
 * };
 *
 * // Rate limit error
 * const rateLimitError: ErrorResponse = {
 *   message: "Rate limit exceeded",
 *   statusCode: 429,
 *   name: "rate_limit_exceeded",
 *   retryAfter: 1
 * };
 * ```
 */
export type ErrorResponse = StandardErrorResponse | RateLimitErrorResponse;

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
