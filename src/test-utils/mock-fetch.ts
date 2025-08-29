import type { MockParams } from 'vitest-fetch-mock';

export interface MockFetchOptions extends MockParams {
  rateLimiting?: {
    limit?: number;
    remaining?: number;
    reset?: number;
  };
}

/**
 * Mock fetch response with rate limiting headers included by default
 */
export function mockFetchWithRateLimit(
  body: string,
  options: MockFetchOptions = {},
): void {
  const {
    rateLimiting = {},
    headers = {},
    status = 200,
    ...restOptions
  } = options;

  const defaultRateLimit = {
    limit: 2,
    remaining: 2,
    reset: 1, // Fixed timestamp for consistent tests
  };

  const rateLimitHeaders = {
    'ratelimit-limit': String(rateLimiting.limit ?? defaultRateLimit.limit),
    'ratelimit-remaining': String(
      rateLimiting.remaining ?? defaultRateLimit.remaining,
    ),
    'ratelimit-reset': String(rateLimiting.reset ?? defaultRateLimit.reset),
  };

  const allHeaders = {
    'content-type': 'application/json',
    ...rateLimitHeaders,
    ...headers,
  };

  fetchMock.mockOnce(body, {
    status,
    headers: allHeaders,
    ...restOptions,
  });
}

/**
 * Mock successful response with rate limiting headers
 */
export function mockSuccessResponse<T>(
  data: T,
  options: MockFetchOptions = {},
): void {
  mockFetchWithRateLimit(JSON.stringify(data), {
    status: 200,
    ...options,
  });
}

/**
 * Mock successful response with a custom status code
 */
export function mockSuccessWithStatusCode<T>(
  data: T,
  status: number,
  options: MockFetchOptions = {},
): void {
  mockFetchWithRateLimit(JSON.stringify(data), {
    status,
    ...options,
  });
}

/**
 * Mock error response with rate limiting headers
 */
export function mockErrorResponse(
  error: { name: string; message: string },
  options: MockFetchOptions = {},
): void {
  mockFetchWithRateLimit(JSON.stringify(error), {
    status: 422,
    ...options,
  });
}
