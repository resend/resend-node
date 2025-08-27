import { formatPaginatedResponse } from './format-paginated-response';

describe('formatPaginatedResponse', () => {
  it('formats paginated response', () => {
    const response = {
      data: {
        object: 'list' as const,
        data: [],
        has_more: false,
      },
      rateLimiting: {
        limit: 100,
        remainingRequests: 99,
        shouldResetAfter: 1000,
      },
      error: null,
    };

    const formattedResponse = formatPaginatedResponse(response);

    expect(formattedResponse).toEqual({
      data: {
        object: 'list',
        data: [],
        hasMore: false,
      },
      rateLimiting: {
        limit: 100,
        remainingRequests: 99,
        shouldResetAfter: 1000,
      },
      error: null,
    });
  });

  it('should return original response if data is missing', () => {
    const response = {
      data: null,
      rateLimiting: null,
      error: {
        message: 'Missing `id` or `email` field.',
        name: 'missing_required_field' as const,
      },
    };

    const formattedResponse = formatPaginatedResponse(response);

    expect(formattedResponse).toEqual(response);
  });
});
