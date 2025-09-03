import {
  type PageRequestOptions,
  type PageResponse,
  PaginatedRequest,
} from './pagination';

type TestItem = {
  id: string;
  name: string;
  created_at: string;
};

describe('PaginatedRequest', () => {
  afterEach(() => fetchMock.resetMocks());

  const createMockFetchPage = (
    pages: Array<{ data: TestItem[]; has_more: boolean }>,
  ) => {
    let pageIndex = 0;
    return vi.fn(
      async (_options: PageRequestOptions): Promise<PageResponse<TestItem>> => {
        const currentPage = pages[pageIndex] || { data: [], has_more: false };
        pageIndex++;

        return {
          data: {
            object: 'list',
            data: currentPage.data,
            has_more: currentPage.has_more,
          },
          error: null,
          rateLimiting: {
            limit: 10,
            remainingRequests: 9,
            shouldResetAfter: 60,
          },
        };
      },
    );
  };

  const testItems: TestItem[] = [
    { id: '1', name: 'Item 1', created_at: '2023-01-01T00:00:00Z' },
    { id: '2', name: 'Item 2', created_at: '2023-01-02T00:00:00Z' },
    { id: '3', name: 'Item 3', created_at: '2023-01-03T00:00:00Z' },
    { id: '4', name: 'Item 4', created_at: '2023-01-04T00:00:00Z' },
    { id: '5', name: 'Item 5', created_at: '2023-01-05T00:00:00Z' },
    { id: '6', name: 'Item 6', created_at: '2023-01-06T00:00:00Z' },
  ];

  describe('Promise interface', () => {
    it('should work with async/await', async () => {
      const mockFetchPage = createMockFetchPage([
        { data: [testItems[0]], has_more: false },
      ]);

      const request = new PaginatedRequest(mockFetchPage, { limit: 1 });
      const result = await request;

      expect(result.data.data).toEqual([testItems[0]]);
      expect(result.error).toBeNull();
    });

    it('should work with try/catch', async () => {
      const mockFetchPage = vi
        .fn()
        .mockRejectedValue(new Error('Network error'));
      const request = new PaginatedRequest(mockFetchPage, { limit: 1 });

      try {
        await request;
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Network error');
      }
    });

    it('should work with try/catch/finally', async () => {
      const mockFetchPage = createMockFetchPage([
        { data: [testItems[0]], has_more: false },
      ]);
      const finallyCallback = vi.fn();

      const request = new PaginatedRequest(mockFetchPage, { limit: 1 });

      try {
        const result = await request;
        expect(result.data.data).toEqual([testItems[0]]);
      } finally {
        finallyCallback();
      }

      expect(finallyCallback).toHaveBeenCalled();
    });

    it('should have correct Symbol.toStringTag', () => {
      const mockFetchPage = createMockFetchPage([]);
      const request = new PaginatedRequest(mockFetchPage, { limit: 1 });

      expect(request[Symbol.toStringTag]).toBe('PaginatedRequest');
    });
  });

  describe('AsyncIterable interface', () => {
    it('should implement AsyncIterable interface', async () => {
      const mockFetchPage = createMockFetchPage([
        { data: [testItems[0], testItems[1]], has_more: true },
        { data: [testItems[2]], has_more: false },
      ]);

      const request = new PaginatedRequest(mockFetchPage, { limit: 2 });
      const pages: PageResponse<TestItem>[] = [];

      for await (const page of request) {
        pages.push(page);
      }

      expect(pages).toHaveLength(2);
      expect(pages[0].data.data).toEqual([testItems[0], testItems[1]]);
      expect(pages[1].data.data).toEqual([testItems[2]]);
    });

    it('should stop iteration when has_more is false', async () => {
      const mockFetchPage = createMockFetchPage([
        { data: [testItems[0]], has_more: false },
      ]);

      const request = new PaginatedRequest(mockFetchPage, { limit: 1 });
      const pages: PageResponse<TestItem>[] = [];

      for await (const page of request) {
        pages.push(page);
      }

      expect(pages).toHaveLength(1);
      expect(mockFetchPage).toHaveBeenCalledTimes(1);
    });

    it('should stop iteration when page data is empty', async () => {
      const mockFetchPage = createMockFetchPage([
        { data: [testItems[0]], has_more: true },
        { data: [], has_more: true },
      ]);

      const request = new PaginatedRequest(mockFetchPage, { limit: 1 });
      const pages: PageResponse<TestItem>[] = [];

      for await (const page of request) {
        pages.push(page);
      }

      expect(pages).toHaveLength(2);
      expect(pages[1].data.data).toEqual([]);
    });
  });

  describe('Pagination options', () => {
    it('should use after cursor for forward pagination', async () => {
      const mockFetchPage = createMockFetchPage([
        { data: [testItems[0], testItems[1]], has_more: true },
        { data: [testItems[2]], has_more: false },
      ]);

      const request = new PaginatedRequest(mockFetchPage, {
        limit: 2,
        after: 'initial-cursor',
      });

      const pages: PageResponse<TestItem>[] = [];
      for await (const page of request) {
        pages.push(page);
      }

      expect(mockFetchPage).toHaveBeenCalledTimes(2);
      expect(mockFetchPage).toHaveBeenNthCalledWith(1, {
        limit: 2,
        after: 'initial-cursor',
      });
      expect(mockFetchPage).toHaveBeenNthCalledWith(2, {
        limit: 2,
        after: testItems[1].id,
      });
    });

    it('should use before cursor for backward pagination', async () => {
      const mockFetchPage = createMockFetchPage([
        { data: [testItems[2], testItems[1]], has_more: true },
        { data: [testItems[0]], has_more: false },
      ]);

      const request = new PaginatedRequest(mockFetchPage, {
        limit: 2,
        before: 'initial-cursor',
      });

      const pages: PageResponse<TestItem>[] = [];
      for await (const page of request) {
        pages.push(page);
      }

      expect(mockFetchPage).toHaveBeenCalledTimes(2);
      expect(mockFetchPage).toHaveBeenNthCalledWith(1, {
        limit: 2,
        before: 'initial-cursor',
      });
      expect(mockFetchPage).toHaveBeenNthCalledWith(2, {
        limit: 2,
        before: testItems[2].id,
      });
    });

    it('should default to forward pagination when no cursor specified', async () => {
      const mockFetchPage = createMockFetchPage([
        { data: [testItems[0], testItems[1]], has_more: true },
        { data: [testItems[2]], has_more: false },
      ]);

      const request = new PaginatedRequest(mockFetchPage, { limit: 2 });
      const pages: PageResponse<TestItem>[] = [];

      for await (const page of request) {
        pages.push(page);
      }

      expect(mockFetchPage).toHaveBeenNthCalledWith(2, {
        limit: 2,
        after: testItems[1].id,
      });
    });
  });

  describe('Rate limiting handling', () => {
    it('should handle rate limit on initial page', async () => {
      const mockFetchPage = vi
        .fn()
        .mockResolvedValueOnce({
          data: null,
          error: {
            name: 'rate_limit_exceeded',
            message: 'Rate limit exceeded',
            retryAfter: 0.001, // Very short delay for testing
          },
          rateLimiting: {
            limit: 10,
            remainingRequests: 0,
            shouldResetAfter: 60,
          },
        })
        .mockResolvedValueOnce({
          data: {
            object: 'list',
            data: [testItems[0]],
            has_more: false,
          },
          error: null,
          rateLimiting: {
            limit: 10,
            remainingRequests: 9,
            shouldResetAfter: 60,
          },
        });

      const request = new PaginatedRequest(mockFetchPage, { limit: 1 });
      const pages: PageResponse<TestItem>[] = [];

      for await (const page of request) {
        pages.push(page);
      }

      expect(pages).toHaveLength(1);
      expect(pages[0].data?.data).toEqual([testItems[0]]);
      expect(mockFetchPage).toHaveBeenCalledTimes(2);
    });

    it('should handle rate limit on subsequent pages', async () => {
      const mockFetchPage = vi
        .fn()
        .mockResolvedValueOnce({
          data: {
            object: 'list',
            data: [testItems[0]],
            has_more: true,
          },
          error: null,
          rateLimiting: {
            limit: 10,
            remainingRequests: 9,
            shouldResetAfter: 60,
          },
        })
        .mockResolvedValueOnce({
          data: null,
          error: {
            name: 'rate_limit_exceeded',
            message: 'Rate limit exceeded',
            retryAfter: 0.001, // Very short delay for testing
          },
          rateLimiting: {
            limit: 10,
            remainingRequests: 0,
            shouldResetAfter: 60,
          },
        })
        .mockResolvedValueOnce({
          data: {
            object: 'list',
            data: [testItems[1]],
            has_more: false,
          },
          error: null,
          rateLimiting: {
            limit: 10,
            remainingRequests: 9,
            shouldResetAfter: 60,
          },
        });

      const request = new PaginatedRequest(mockFetchPage, { limit: 1 });
      const pages: PageResponse<TestItem>[] = [];

      for await (const page of request) {
        pages.push(page);
      }

      expect(pages).toHaveLength(2);
      expect(pages[0].data?.data).toEqual([testItems[0]]);
      expect(pages[1].data?.data).toEqual([testItems[1]]);
      expect(mockFetchPage).toHaveBeenCalledTimes(3);
    });

    it('should not wait on first call to getPageRetryingRateLimit when firstWait is 0', async () => {
      const mockFetchPage = vi.fn().mockResolvedValue({
        data: { object: 'list', data: [testItems[0]], has_more: false },
        error: null,
        rateLimiting: { limit: 10, remainingRequests: 9, shouldResetAfter: 60 },
      });

      const request = new PaginatedRequest(mockFetchPage, { limit: 1 });

      const pages: PageResponse<TestItem>[] = [];
      for await (const page of request) {
        pages.push(page);
        break; // Only get first page to test this scenario
      }

      expect(pages).toHaveLength(1);
      expect(mockFetchPage).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error handling', () => {
    it('should handle non-rate-limit errors in fetchPage', async () => {
      const mockFetchPage = vi.fn().mockResolvedValue({
        data: null,
        error: {
          name: 'invalid_parameter',
          message: 'Invalid parameter provided',
        },
        rateLimiting: { limit: 10, remainingRequests: 9, shouldResetAfter: 60 },
      });

      const request = new PaginatedRequest(mockFetchPage, { limit: 1 });
      const pages: PageResponse<TestItem>[] = [];

      for await (const page of request) {
        pages.push(page);
      }

      expect(pages).toHaveLength(1);
      expect(pages[0].error?.name).toBe('invalid_parameter');
      expect(pages[0].data).toBeNull();
    });

    it('should handle Promise rejection in fetchPage', async () => {
      const mockFetchPage = vi
        .fn()
        .mockRejectedValue(new Error('Network error'));
      const request = new PaginatedRequest(mockFetchPage, { limit: 1 });

      await expect(async () => {
        for await (const _page of request) {
          // This should throw
        }
      }).rejects.toThrow('Network error');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty first page', async () => {
      const mockFetchPage = createMockFetchPage([
        { data: [], has_more: false },
      ]);

      const request = new PaginatedRequest(mockFetchPage, { limit: 10 });
      const pages: PageResponse<TestItem>[] = [];

      for await (const page of request) {
        pages.push(page);
      }

      expect(pages).toHaveLength(1);
      expect(pages[0].data?.data).toEqual([]);
      expect(pages[0].data?.has_more).toBe(false);
    });

    it('should handle single item across multiple pages', async () => {
      const mockFetchPage = createMockFetchPage([
        { data: [testItems[0]], has_more: true },
        { data: [testItems[1]], has_more: true },
        { data: [testItems[2]], has_more: false },
      ]);

      const request = new PaginatedRequest(mockFetchPage, { limit: 1 });
      const pages: PageResponse<TestItem>[] = [];

      for await (const page of request) {
        pages.push(page);
      }

      expect(pages).toHaveLength(3);
      expect(pages[0].data?.data).toEqual([testItems[0]]);
      expect(pages[1].data?.data).toEqual([testItems[1]]);
      expect(pages[2].data?.data).toEqual([testItems[2]]);
    });

    it('should handle mixed Promise and AsyncIterable usage', async () => {
      const mockFetchPage = createMockFetchPage([
        { data: [testItems[0]], has_more: true },
        { data: [testItems[1]], has_more: false },
      ]);

      const request = new PaginatedRequest(mockFetchPage, { limit: 1 });

      // First use as Promise
      const firstPage = await request;
      expect(firstPage.data.data).toEqual([testItems[0]]);

      // Then use as AsyncIterable (should start fresh iteration)
      const pages: PageResponse<TestItem>[] = [];
      for await (const page of request) {
        pages.push(page);
      }

      expect(pages).toHaveLength(2);
      expect(pages[0].data?.data).toEqual([testItems[0]]);
      expect(pages[1].data?.data).toEqual([testItems[1]]);
    });
  });

  describe('Type constraints', () => {
    it('should work with objects that have id property', async () => {
      type CustomItem = { id: string; value: number };
      const customItems: CustomItem[] = [
        { id: 'a1', value: 10 },
        { id: 'b2', value: 20 },
      ];

      const mockFetchPage = vi.fn().mockResolvedValue({
        data: { object: 'list', data: customItems, has_more: false },
        error: null,
        rateLimiting: { limit: 10, remainingRequests: 9, shouldResetAfter: 60 },
      });

      const request = new PaginatedRequest(mockFetchPage, { limit: 10 });
      const result = await request;

      expect(result.data.data).toEqual(customItems);
    });
  });
});
