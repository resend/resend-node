// @ts-ignore: this is used in the jsdoc for `shouldResetAfter`
import type { Response } from './interfaces';

export type RateLimit = {
  /**
   * The maximum amount of requests that can be made in the time window of {@link shouldResetAfter}.
   */
  limit: number;
  /**
   * The amount of requests that can still be made before hitting {@link RateLimit.limit}.
   *
   * Resets after the seconds in {@link RateLimit.shouldResetAfter} go by.
   */
  remainingRequests: number;
  /**
   * The number of seconds after which the rate limiting will reset,
   * and {@link RateLimit.remainingRequests} goes back to the value of
   * {@link RateLimit.limit}.
   *
   * @see {@link import('./interfaces').Response.retryAfter}
   */
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
