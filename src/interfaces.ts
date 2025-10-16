export type RESEND_ERROR_CODE_KEY =
  | 'missing_required_field'
  | 'invalid_idempotency_key'
  | 'invalid_idempotent_request'
  | 'concurrent_idempotent_requests'
  | 'invalid_access'
  | 'invalid_parameter'
  | 'invalid_region'
  | 'rate_limit_exceeded'
  | 'missing_api_key'
  | 'invalid_api_key'
  | 'suspended_api_key'
  | 'invalid_from_address'
  | 'validation_error'
  | 'not_found'
  | 'method_not_allowed'
  | 'application_error'
  | 'internal_server_error';

export interface ErrorResponse {
  message: string;
  name: RESEND_ERROR_CODE_KEY;
}

export type Tag = { name: string; value: string };
