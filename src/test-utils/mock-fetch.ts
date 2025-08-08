import type { MockResponseInit } from 'jest-fetch-mock';

export interface MockFetchOptions extends Omit<MockResponseInit, 'headers'> {
  headers?: Record<string, string>;
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
    limit: 100,
    remaining: 99,
    reset: 1754677253, // Fixed timestamp for consistent tests
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
