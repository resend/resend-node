import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../../resend';
import {
  mockSuccessResponse,
  mockSuccessWithStatusCode,
} from '../../test-utils/mock-fetch';
import type { BatchAddSuppressionsResponseSuccess } from './interfaces/batch-add-suppressions.interface';
import type { BatchRemoveSuppressionsResponseSuccess } from './interfaces/batch-remove-suppressions.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const API_KEY = 're_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop';

describe('Suppressions batch', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('add', () => {
    it('adds up to 100 suppressions at once', async () => {
      const response: BatchAddSuppressionsResponseSuccess = {
        data: [
          {
            object: 'suppression',
            id: 'e169aa45-1ecf-4183-9955-b1499d5701d3',
          },
        ],
      };
      mockSuccessWithStatusCode(response, 201, {});

      const resend = new Resend(API_KEY);
      await expect(
        resend.suppressions.batch.add({ emails: ['blocked@example.com'] }),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "data": [
              {
                "id": "e169aa45-1ecf-4183-9955-b1499d5701d3",
                "object": "suppression",
              },
            ],
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/suppressions/batch/add');
      expect(options?.method).toBe('POST');
      expect(JSON.parse(options?.body as string)).toEqual({
        emails: ['blocked@example.com'],
      });
    });
  });

  describe('remove', () => {
    it('removes up to 100 suppressions at once by email', async () => {
      const response: BatchRemoveSuppressionsResponseSuccess = {
        data: [
          {
            object: 'suppression',
            id: 'e169aa45-1ecf-4183-9955-b1499d5701d3',
            deleted: true,
          },
        ],
      };
      mockSuccessResponse(response, {});

      const resend = new Resend(API_KEY);
      await expect(
        resend.suppressions.batch.remove({ emails: ['blocked@example.com'] }),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "data": [
              {
                "deleted": true,
                "id": "e169aa45-1ecf-4183-9955-b1499d5701d3",
                "object": "suppression",
              },
            ],
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/suppressions/batch/remove');
      expect(options?.method).toBe('POST');
      expect(JSON.parse(options?.body as string)).toEqual({
        emails: ['blocked@example.com'],
      });
    });

    it('removes suppressions by ids', async () => {
      mockSuccessResponse({ data: [] }, {});

      const resend = new Resend(API_KEY);
      await resend.suppressions.batch.remove({
        ids: ['e169aa45-1ecf-4183-9955-b1499d5701d3'],
      });

      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/suppressions/batch/remove');
      expect(options?.method).toBe('POST');
      expect(JSON.parse(options?.body as string)).toEqual({
        ids: ['e169aa45-1ecf-4183-9955-b1499d5701d3'],
      });
    });
  });
});
