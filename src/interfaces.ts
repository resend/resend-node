export type RESEND_ERROR_CODE_KEY =
  | 'invalid_idempotency_key'
  | 'validation_error'
  | 'missing_api_key'
  | 'restricted_api_key'
  | 'invalid_api_key'
  | 'not_found'
  | 'method_not_allowed'
  | 'invalid_idempotent_request'
  | 'concurrent_idempotent_requests'
  | 'invalid_attachment'
  | 'invalid_from_address'
  | 'invalid_access'
  | 'invalid_parameter'
  | 'invalid_region'
  | 'missing_required_field'
  | 'monthly_quota_exceeded'
  | 'daily_quota_exceeded'
  | 'rate_limit_exceeded'
  | 'security_error'
  | 'application_error'
  | 'internal_server_error';

export type Response<T> = (
  | {
    data: T;
    error: null;
  }
  | { error: ErrorResponse; data: null }
) & {
  headers: Record<string, string> | null;
};

export type ErrorResponse = {
  message: string;
  statusCode: number | null;
  name: RESEND_ERROR_CODE_KEY;
};

export type Tag = { name: string; value: string };
