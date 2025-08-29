import { Resend } from '../resend';
import {
  mockSuccessResponse,
  mockSuccessWithStatusCode,
} from '../test-utils/mock-fetch';
import type { CreateBatchOptions } from './interfaces/create-batch-options.interface';

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

describe('Batch', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('create', () => {
    it('sends multiple emails', async () => {
      const payload: CreateBatchOptions = [
        {
          from: 'bu@resend.com',
          to: 'zeno@resend.com',
          subject: 'Hello World',
          html: '<h1>Hello world</h1>',
        },
        {
          from: 'vitor@resend.com',
          to: 'zeno@resend.com',
          subject: 'Olá mundo',
          html: '<h1>olá mundo</h1>',
        },
        {
          from: 'bu@resend.com',
          to: 'vitor@resend.com',
          subject: 'Hi there',
          html: '<h1>Hi there</h1>',
        },
      ];
      mockSuccessResponse(
        {
          data: [
            { id: 'aabeeefc-bd13-474a-a440-0ee139b3a4cc' },
            { id: 'aebe1c6e-30ad-4257-993b-519f5affa626' },
            { id: 'b2bc2598-f98b-4da4-86c9-7b32881ef394' },
          ],
        },
        {
          headers: {
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        },
      );

      const data = await resend.batch.create(payload);
      expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "data": [
      {
        "id": "aabeeefc-bd13-474a-a440-0ee139b3a4cc",
      },
      {
        "id": "aebe1c6e-30ad-4257-993b-519f5affa626",
      },
      {
        "id": "b2bc2598-f98b-4da4-86c9-7b32881ef394",
      },
    ],
  },
  "error": null,
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
    });

    it('does not send the Idempotency-Key header when idempotencyKey is not provided', async () => {
      mockSuccessResponse(
        {
          data: [
            {
              id: 'not-idempotent-123',
            },
          ],
        },
        {
          headers: {
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        },
      );

      const payload: CreateBatchOptions = [
        {
          from: 'admin@resend.com',
          to: 'user@resend.com',
          subject: 'Not Idempotent Test',
          html: '<h1>Test</h1>',
        },
      ];

      await resend.batch.create(payload);

      // Inspect the last fetch call and body
      const lastCall = fetchMock.mock.calls[0];
      expect(lastCall).toBeDefined();

      const request = lastCall[1];
      expect(request).toBeDefined();

      const headers = new Headers(request?.headers);
      expect(headers.has('Idempotency-Key')).toBeFalsy();
    });

    it('sends the Idempotency-Key header when idempotencyKey is provided', async () => {
      mockSuccessResponse(
        {
          data: [
            {
              id: 'idempotent-123',
            },
          ],
        },
        {
          headers: {
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        },
      );

      const payload: CreateBatchOptions = [
        {
          from: 'admin@resend.com',
          to: 'user@resend.com',
          subject: 'Idempotency Test',
          html: '<h1>Test</h1>',
        },
      ];
      const idempotencyKey = 'unique-key-123';

      await resend.batch.create(payload, { idempotencyKey });

      // Inspect the last fetch call and body
      const lastCall = fetchMock.mock.calls[0];
      expect(lastCall).toBeDefined();

      // Check if headers contains Idempotency-Key
      // In the mock, headers is an object with key-value pairs
      expect(fetchMock.mock.calls[0][1]?.headers).toBeDefined();

      //@ts-expect-error
      const hasIdempotencyKey = lastCall[1]?.headers.has('Idempotency-Key');
      expect(hasIdempotencyKey).toBeTruthy();

      //@ts-expect-error
      const usedIdempotencyKey = lastCall[1]?.headers.get('Idempotency-Key');
      expect(usedIdempotencyKey).toBe(idempotencyKey);
    });
  });

  describe('send', () => {
    it('sends multiple emails', async () => {
      const payload = [
        {
          from: 'bu@resend.com',
          to: 'zeno@resend.com',
          subject: 'Hello World',
          html: '<h1>Hello world</h1>',
        },
        {
          from: 'vitor@resend.com',
          to: 'zeno@resend.com',
          subject: 'Olá mundo',
          html: '<h1>olá mundo</h1>',
        },
        {
          from: 'bu@resend.com',
          to: 'vitor@resend.com',
          subject: 'Hi there',
          html: '<h1>Hi there</h1>',
        },
      ];

      mockSuccessResponse(
        {
          data: [
            { id: 'aabeeefc-bd13-474a-a440-0ee139b3a4cc' },
            { id: 'aebe1c6e-30ad-4257-993b-519f5affa626' },
            { id: 'b2bc2598-f98b-4da4-86c9-7b32881ef394' },
          ],
        },
        {
          headers: {
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        },
      );

      const data = await resend.batch.send(payload);
      expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "data": [
      {
        "id": "aabeeefc-bd13-474a-a440-0ee139b3a4cc",
      },
      {
        "id": "aebe1c6e-30ad-4257-993b-519f5affa626",
      },
      {
        "id": "b2bc2598-f98b-4da4-86c9-7b32881ef394",
      },
    ],
  },
  "error": null,
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
    });

    it('does not send the Idempotency-Key header when idempotencyKey is not provided', async () => {
      mockSuccessResponse(
        {
          data: [
            {
              id: 'not-idempotent-123',
            },
          ],
        },
        {
          headers: {
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        },
      );

      const payload: CreateBatchOptions = [
        {
          from: 'admin@resend.com',
          to: 'user@resend.com',
          subject: 'Not Idempotent Test',
          html: '<h1>Test</h1>',
        },
      ];

      await resend.batch.send(payload);

      // Inspect the last fetch call and body
      const lastCall = fetchMock.mock.calls[0];
      expect(lastCall).toBeDefined();
      const request = lastCall[1];
      expect(request).toBeDefined();
      const headers = new Headers(request?.headers);
      expect(headers.has('Idempotency-Key')).toBe(false);
    });

    it('sends the Idempotency-Key header when idempotencyKey is provided', async () => {
      mockSuccessResponse(
        {
          data: [
            {
              id: 'idempotent-123',
            },
          ],
        },
        {
          headers: {
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        },
      );

      const payload: CreateBatchOptions = [
        {
          from: 'admin@resend.com',
          to: 'user@resend.com',
          subject: 'Idempotency Test',
          html: '<h1>Test</h1>',
        },
      ];
      const idempotencyKey = 'unique-key-123';

      await resend.batch.send(payload, { idempotencyKey });

      // Inspect the last fetch call and body
      const lastCall = fetchMock.mock.calls[0];
      expect(lastCall).toBeDefined();
      const headers = new Headers(lastCall[1]?.headers);
      expect(headers.has('Idempotency-Key')).toBeTruthy();
      expect(headers.get('Idempotency-Key')).toBe(idempotencyKey);
    });

    it('handles batch response with errors field when permissive option is set', async () => {
      mockSuccessWithStatusCode(
        {
          data: [],
          errors: [{ index: 2, message: 'Invalid email address' }],
        },
        202,
        {
          headers: {
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        },
      );

      const payload: CreateBatchOptions = [];

      const result = await resend.batch.create(payload, {
        batchValidation: 'permissive',
      });

      // Verify the header was passed correctly
      const lastCall = fetchMock.mock.calls[0];
      expect(lastCall).toBeDefined();
      const request = lastCall[1];
      expect(request).toBeDefined();
      const headers = new Headers(request?.headers);
      expect(headers.get('x-resend-batch-validation')).toBe('permissive');

      expect(result.data).toEqual({
        data: [],
        errors: [{ index: 2, message: 'Invalid email address' }],
      });
      expect(result.error).toBeNull();
    });

    it('removes errors field when permissive header is not set (backward compatibility)', async () => {
      mockSuccessResponse(
        {
          data: [
            { id: 'success-email-1' },
            { id: 'success-email-2' },
            { id: 'success-email-3' },
          ],
        },
        {
          headers: {
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        },
      );

      const payload: CreateBatchOptions = [
        {
          from: 'admin@resend.com',
          to: 'user1@example.com',
          subject: 'Test 1',
          html: '<h1>Test 1</h1>',
        },
        {
          from: 'admin@resend.com',
          to: 'user2@example.com',
          subject: 'Test 2',
          html: '<h1>Test 2</h1>',
        },
        {
          from: 'admin@resend.com',
          to: 'invalid-email',
          subject: 'Test 3',
          html: '<h1>Test 3</h1>',
        },
      ];

      const response = await resend.batch.create(payload);
      // Should not have errors field for backward compatibility
      expect(response.data).not.toHaveProperty('errors');
      expect(response.data?.data).toEqual([
        { id: 'success-email-1' },
        { id: 'success-email-2' },
        { id: 'success-email-3' },
      ]);
    });
  });
});
