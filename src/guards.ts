import { ErrorResponse, RESEND_ERROR_CODES_BY_KEY } from './interfaces';

export const isResendErrorResponse = (
  response: unknown,
): response is ErrorResponse => {
  if (typeof response !== 'object' || response === null) {
    return false;
  }

  const error = response as ErrorResponse;

  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const { message, name } = error;

  return typeof message === 'string' && typeof name === 'string';
};

/**
 * Consider whether to use this stricter version of the type guard.
 *
 * Right now, it's not used as there is a risk that an API error will not be
 * caught due to the API being ahead of the current types.
 */
export const isResendErrorResponseStrict = (
  response: unknown,
): response is ErrorResponse => {
  if (typeof response !== 'object' || response === null) {
    return false;
  }

  const error = response as ErrorResponse;

  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const { message, name } = error;

  return (
    typeof message === 'string' &&
    typeof name === 'string' &&
    name in RESEND_ERROR_CODES_BY_KEY
  );
};
