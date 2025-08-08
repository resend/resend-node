export type RateLimit = {
  limit: number;
  remainingRequests: number;
  shouldResetAfter: number;
};

export function parseRateLimit(headers: Headers): RateLimit {
  const limitHeader = headers.get('ratelimit-limit');
  const remainingHeader = headers.get('ratelimit-remaining');
  const resetHeader = headers.get('ratelimit-reset');

  if (!limitHeader || !remainingHeader || !resetHeader) {
    throw new Error(
      "The rate limit headers are not present in the response, something must've gone wrong, please email us at support@resend.com",
    );
  }

  const limit = Number.parseInt(limitHeader, 10);
  const remaining = Number.parseInt(remainingHeader, 10);
  const reset = Number.parseInt(resetHeader, 10);

  return {
    limit,
    remainingRequests: remaining,
    shouldResetAfter: reset,
  };
}
