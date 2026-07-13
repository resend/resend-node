import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../resend';
import {
  mockSuccessResponse,
  mockSuccessWithStatusCode,
} from '../test-utils/mock-fetch';
import type { AddSuppressionResponseSuccess } from './interfaces/add-suppression.interface';
import type { GetSuppressionResponseSuccess } from './interfaces/get-suppression.interface';
import type { ListSuppressionsResponseSuccess } from './interfaces/list-suppressions.interface';
import type { RemoveSuppressionResponseSuccess } from './interfaces/remove-suppression.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const API_KEY = 're_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop';

describe('Suppressions', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('add', () => {
    it('adds a suppression', async () => {
      const response: AddSuppressionResponseSuccess = {
        object: 'suppression',
        id: '3deaccfb-f47f-440a-8875-ea14b1716b43',
      };
      mockSuccessWithStatusCode(response, 201, {});

      const resend = new Resend(API_KEY);
      await expect(
        resend.suppressions.add({ email: 'blocked@example.com' }),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "3deaccfb-f47f-440a-8875-ea14b1716b43",
            "object": "suppression",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/suppressions');
      expect(options?.method).toBe('POST');
      expect(JSON.parse(options?.body as string)).toEqual({
        email: 'blocked@example.com',
      });
    });
  });

  describe('get', () => {
    it('gets a suppression by id or email', async () => {
      const response: GetSuppressionResponseSuccess = {
        object: 'suppression',
        id: 'fd61172c-cafc-40f5-b049-b45947779a29',
        email: 'blocked@example.com',
        origin: 'bounce',
        source_id: null,
        created_at: '2024-01-16T18:12:26.514Z',
      };
      mockSuccessResponse(response, {});

      const resend = new Resend(API_KEY);
      await expect(
        resend.suppressions.get('blocked@example.com'),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "created_at": "2024-01-16T18:12:26.514Z",
            "email": "blocked@example.com",
            "id": "fd61172c-cafc-40f5-b049-b45947779a29",
            "object": "suppression",
            "origin": "bounce",
            "source_id": null,
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('encodes the identifier in the path', async () => {
      mockSuccessResponse({}, {});

      const resend = new Resend(API_KEY);
      await resend.suppressions.get('user+tag@example.com');

      const [url] = fetchMock.mock.calls[0];
      expect(url).toContain('/suppressions/user%2Btag%40example.com');
    });

    it('returns error when missing identifier', async () => {
      const resend = new Resend(API_KEY);
      await expect(resend.suppressions.get('')).resolves.toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "Missing \`id\` field.",
            "name": "missing_required_field",
            "statusCode": null,
          },
          "headers": null,
        }
      `);
      expect(fetchMock.mock.calls.length).toBe(0);
    });
  });

  describe('remove', () => {
    it('removes a suppression', async () => {
      const response: RemoveSuppressionResponseSuccess = {
        object: 'suppression',
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        deleted: true,
      };
      mockSuccessResponse(response, {});

      const resend = new Resend(API_KEY);
      await expect(
        resend.suppressions.remove('blocked@example.com'),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "deleted": true,
            "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
            "object": "suppression",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/suppressions/blocked%40example.com');
      expect(options?.method).toBe('DELETE');
    });

    it('returns error when missing identifier', async () => {
      const resend = new Resend(API_KEY);
      await expect(
        resend.suppressions.remove(''),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "Missing \`id\` field.",
            "name": "missing_required_field",
            "statusCode": null,
          },
          "headers": null,
        }
      `);
      expect(fetchMock.mock.calls.length).toBe(0);
    });
  });

  describe('list', () => {
    const listResponse: ListSuppressionsResponseSuccess = {
      object: 'list',
      has_more: false,
      data: [
        {
          object: 'suppression',
          id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
          email: 'blocked@example.com',
          origin: 'complaint',
          source_id: null,
          created_at: '2023-04-07T23:13:52.669661+00:00',
        },
      ],
    };

    it('lists suppressions without options', async () => {
      mockSuccessResponse(listResponse, {});

      const resend = new Resend(API_KEY);
      const result = await resend.suppressions.list();
      expect(result.data).toEqual(listResponse);

      const [url] = fetchMock.mock.calls[0];
      expect(url).toContain('/suppressions');
      expect(url).not.toContain('?');
    });

    it('appends origin and pagination to the query', async () => {
      mockSuccessResponse(listResponse, {});

      const resend = new Resend(API_KEY);
      await resend.suppressions.list({ origin: 'bounce', limit: 50 });

      const [url] = fetchMock.mock.calls[0];
      expect(url).toContain('origin=bounce');
      expect(url).toContain('limit=50');
    });
  });
});
