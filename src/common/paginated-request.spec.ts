import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import type { Response } from '../interfaces';
import type { PaginatedData, PaginationOptions } from './paginated-request';
import { PaginatedRequest } from './paginated-request';

interface TestItem {
  id: string;
  name: string;
}

describe('PaginatedRequest', () => {
  let mockFetchPage: Mock<
    (options: PaginationOptions) => Promise<Response<PaginatedData<TestItem>>>
  >;

  beforeEach(() => {
    mockFetchPage = vi.fn();
  });

  describe('when used as regular promise', () => {
    it('calls fetch page with provided options', async () => {
      const mockResponse: Response<PaginatedData<TestItem>> = {
        data: {
          object: 'list',
          has_more: false,
          data: [{ id: '1', name: 'Item 1' }],
        },
        error: null,
        rateLimiting: { limit: 10, remainingRequests: 9, shouldResetAfter: 60 },
      };
      mockFetchPage.mockResolvedValue(mockResponse);

      let options: PaginationOptions = {};
      let request = new PaginatedRequest(mockFetchPage);
      await request;

      options = { limit: 10, after: 'cursor1' };
      request = new PaginatedRequest(mockFetchPage, options);
      await request;

      options = { limit: 20, before: 'cursor2' };
      request = new PaginatedRequest(mockFetchPage, options);
      await request;

      expect(mockFetchPage).toHaveBeenCalledTimes(3);
      expect(mockFetchPage).toHaveBeenNthCalledWith(1, {});
      expect(mockFetchPage).toHaveBeenNthCalledWith(2, {
        limit: 10,
        after: 'cursor1',
      });
      expect(mockFetchPage).toHaveBeenNthCalledWith(3, {
        limit: 20,
        before: 'cursor2',
      });
    });

    it('resolves with fetched data', async () => {
      const mockResponse: Response<PaginatedData<TestItem>> = {
        data: {
          object: 'list',
          has_more: false,
          data: [{ id: '1', name: 'Item 1' }],
        },
        error: null,
        rateLimiting: { limit: 10, remainingRequests: 9, shouldResetAfter: 60 },
      };
      mockFetchPage.mockResolvedValue(mockResponse);

      const request = new PaginatedRequest(mockFetchPage);
      const response = await request;

      expect(response).toEqual(mockResponse);
    });

    it('rejects when fetchPage rejects', async () => {
      const error = new Error('Network error');
      mockFetchPage.mockRejectedValue(error);

      const request = new PaginatedRequest(mockFetchPage);
      await expect(request).rejects.toThrow('Network error');
    });
  });
  describe('iterate', () => {
    it('iterates through single page of items', async () => {
      const mockResponse: Response<PaginatedData<TestItem>> = {
        data: {
          object: 'list',
          has_more: false,
          data: [
            { id: '1', name: 'Item 1' },
            { id: '2', name: 'Item 2' },
          ],
        },
        error: null,
        rateLimiting: { limit: 10, remainingRequests: 9, shouldResetAfter: 60 },
      };
      mockFetchPage.mockResolvedValue(mockResponse);

      const request = new PaginatedRequest(mockFetchPage);
      const items: TestItem[] = [];
      for await (const item of request.iterate()) {
        items.push(item);
      }
      expect(items).toEqual([
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
      ]);
      expect(mockFetchPage).toHaveBeenCalledTimes(1); // Only called in constructor, iterate reuses initial fetch
    });

    it('iterates through multiple pages using forward pagination', async () => {
      const page1Response: Response<PaginatedData<TestItem>> = {
        data: {
          object: 'list',
          has_more: true,
          data: [
            { id: '1', name: 'Item 1' },
            { id: '2', name: 'Item 2' },
          ],
        },
        error: null,
        rateLimiting: { limit: 10, remainingRequests: 9, shouldResetAfter: 60 },
      };

      const page2Response: Response<PaginatedData<TestItem>> = {
        data: {
          object: 'list',
          has_more: false,
          data: [
            { id: '3', name: 'Item 3' },
            { id: '4', name: 'Item 4' },
          ],
        },
        error: null,
        rateLimiting: { limit: 10, remainingRequests: 8, shouldResetAfter: 60 },
      };

      mockFetchPage
        .mockResolvedValueOnce(page1Response) // Constructor call
        .mockResolvedValueOnce(page2Response); // Second iterate() call

      const request = new PaginatedRequest(mockFetchPage);
      const items: TestItem[] = [];

      for await (const item of request.iterate()) {
        items.push(item);
      }

      expect(items).toHaveLength(4);
      expect(items.map((i) => i.id)).toEqual(['1', '2', '3', '4']);
      expect(mockFetchPage).toHaveBeenCalledTimes(2);
      expect(mockFetchPage).toHaveBeenNthCalledWith(1, {}); // Constructor
      expect(mockFetchPage).toHaveBeenNthCalledWith(2, {
        after: '2',
        before: undefined,
      }); // Second iterate() call
    });

    it('iterates through multiple pages using backward pagination', async () => {
      const page1Response: Response<PaginatedData<TestItem>> = {
        data: {
          object: 'list',
          has_more: true,
          data: [
            { id: '4', name: 'Item 4' },
            { id: '3', name: 'Item 3' },
          ],
        },
        error: null,
        rateLimiting: { limit: 10, remainingRequests: 9, shouldResetAfter: 60 },
      };

      const page2Response: Response<PaginatedData<TestItem>> = {
        data: {
          object: 'list',
          has_more: false,
          data: [
            { id: '2', name: 'Item 2' },
            { id: '1', name: 'Item 1' },
          ],
        },
        error: null,
        rateLimiting: { limit: 10, remainingRequests: 8, shouldResetAfter: 60 },
      };

      mockFetchPage
        .mockResolvedValueOnce(page1Response) // Constructor call
        .mockResolvedValueOnce(page2Response); // Second iterate() call

      const request = new PaginatedRequest(mockFetchPage, {
        before: 'cursor5',
      });
      const items: TestItem[] = [];

      for await (const item of request.iterate()) {
        items.push(item);
      }

      expect(items).toHaveLength(4);
      expect(items.map((i) => i.id)).toEqual(['4', '3', '2', '1']);
      expect(mockFetchPage).toHaveBeenCalledTimes(2);
      expect(mockFetchPage).toHaveBeenNthCalledWith(1, { before: 'cursor5' }); // Constructor
      expect(mockFetchPage).toHaveBeenNthCalledWith(2, {
        before: '4',
        after: undefined,
      }); // Second iterate() call
    });

    it('handles empty pages', async () => {
      const mockResponse: Response<PaginatedData<TestItem>> = {
        data: {
          object: 'list',
          has_more: false,
          data: [],
        },
        error: null,
        rateLimiting: { limit: 10, remainingRequests: 9, shouldResetAfter: 60 },
      };
      mockFetchPage.mockResolvedValue(mockResponse);

      const request = new PaginatedRequest(mockFetchPage);
      const items: TestItem[] = [];
      for await (const item of request.iterate()) {
        items.push(item);
      }
      expect(items).toHaveLength(0);
      expect(mockFetchPage).toHaveBeenCalledTimes(1); // Only called in constructor, iterate reuses initial fetch
    });

    it('stops iteration on error', async () => {
      const errorResponse: Response<PaginatedData<TestItem>> = {
        data: null,
        error: {
          name: 'invalid_parameter',
          message: 'Invalid cursor',
        },
        rateLimiting: null,
      };
      mockFetchPage.mockResolvedValue(errorResponse);

      const request = new PaginatedRequest(mockFetchPage);
      const items: TestItem[] = [];
      for await (const item of request.iterate()) {
        items.push(item);
      }
      expect(items).toHaveLength(0);
      expect(mockFetchPage).toHaveBeenCalledTimes(1); // Only called in constructor, iterate reuses initial fetch
    });

    it('handles rate limit error on first fetch', async () => {
      const rateLimitResponse: Response<PaginatedData<TestItem>> = {
        data: null,
        error: {
          name: 'rate_limit_exceeded',
          message: 'Rate limit exceeded',
          retryAfter: 0.1, // 100ms
        },
        rateLimiting: null,
      };

      const successResponse: Response<PaginatedData<TestItem>> = {
        data: {
          object: 'list',
          has_more: false,
          data: [{ id: '1', name: 'Item 1' }],
        },
        error: null,
        rateLimiting: { limit: 10, remainingRequests: 9, shouldResetAfter: 60 },
      };

      mockFetchPage
        .mockResolvedValueOnce(rateLimitResponse) // First call - rate limit
        .mockResolvedValueOnce(successResponse); // Second call - success

      const startTime = Date.now();
      const request = new PaginatedRequest(mockFetchPage);
      const items: TestItem[] = [];
      for await (const item of request.iterate()) {
        items.push(item);
      }
      const endTime = Date.now();
      const elapsed = endTime - startTime;

      expect(items).toHaveLength(1);
      expect(items[0]).toEqual({ id: '1', name: 'Item 1' });
      expect(mockFetchPage).toHaveBeenCalledTimes(2);
      expect(elapsed).toBeGreaterThanOrEqual(100); // Should have waited at least 100ms
    });

    it('handles rate limit error on subsequent fetch', async () => {
      const page1Response: Response<PaginatedData<TestItem>> = {
        data: {
          object: 'list',
          has_more: true,
          data: [{ id: '1', name: 'Item 1' }],
        },
        error: null,
        rateLimiting: { limit: 10, remainingRequests: 9, shouldResetAfter: 60 },
      };

      const rateLimitResponse: Response<PaginatedData<TestItem>> = {
        data: null,
        error: {
          name: 'rate_limit_exceeded',
          message: 'Rate limit exceeded',
          retryAfter: 0.1, // 100ms
        },
        rateLimiting: null,
      };

      const page2Response: Response<PaginatedData<TestItem>> = {
        data: {
          object: 'list',
          has_more: false,
          data: [{ id: '2', name: 'Item 2' }],
        },
        error: null,
        rateLimiting: { limit: 10, remainingRequests: 8, shouldResetAfter: 60 },
      };

      mockFetchPage
        .mockResolvedValueOnce(page1Response) // First call - page 1
        .mockResolvedValueOnce(rateLimitResponse) // Second call - rate limit
        .mockResolvedValueOnce(page2Response); // Third call - page 2

      const startTime = Date.now();
      const request = new PaginatedRequest(mockFetchPage);
      const items: TestItem[] = [];
      for await (const item of request.iterate()) {
        items.push(item);
      }
      const endTime = Date.now();
      const elapsed = endTime - startTime;

      expect(items).toHaveLength(2);
      expect(items.map((i) => i.id)).toEqual(['1', '2']);
      expect(mockFetchPage).toHaveBeenCalledTimes(3);
      expect(elapsed).toBeGreaterThanOrEqual(100); // Should have waited at least 100ms
    });
  });
});
