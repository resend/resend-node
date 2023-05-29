export const RESEND_ERROR_CODES_BY_KEY = {
  missing_required_fields: 422,
  rate_limit_exceeded: 429,
  missing_api_key: 401,
  invalid_api_Key: 403,
  invalid_from_address: 403,
  not_found: 404,
  method_not_allowed: 405,
  internal_server_error: 500,
} as const;

type ValueOf<TObj> = TObj[keyof TObj];

export type RESEND_ERROR_CODE_NUMBER = ValueOf<
  typeof RESEND_ERROR_CODES_BY_KEY
>;
export type RESEND_ERROR_CODE_KEY = keyof typeof RESEND_ERROR_CODES_BY_KEY;

interface ErrorResponse {
  error: {
    message: string;
    status: RESEND_ERROR_CODE_NUMBER;
    type: RESEND_ERROR_CODE_KEY;
  };
}

export { ErrorResponse };

export type Tag = { name: string; value: string };
