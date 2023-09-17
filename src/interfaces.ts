export const RESEND_ERROR_CODES_BY_KEY = {
  missing_required_field: 422,
  invalid_attachment: 422,
  missing_api_key: 401,
  restricted_api_key: 401,
  not_found: 404,
  rate_limit_exceeded: 429,
  daily_quota_exceeded: 429,
  application_error: 500,
  validation_error: 400,
  security_error: 451,
} as const;

type ValueOf<TObj> = TObj[keyof TObj];

export type RESEND_ERROR_CODE_NUMBER = ValueOf<
  typeof RESEND_ERROR_CODES_BY_KEY
>;
export type RESEND_ERROR_CODE_KEY = keyof typeof RESEND_ERROR_CODES_BY_KEY;

interface ErrorResponse {
  message: string;
  statusCode: RESEND_ERROR_CODE_NUMBER;
  name: RESEND_ERROR_CODE_KEY;
}

export { ErrorResponse };

export type Tag = { name: string; value: string };
