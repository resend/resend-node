import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type {
  CreateBatchOptions,
  CreateBatchSuccessResponse,
} from './interfaces/create-batch-options.interface';

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
      const response: CreateBatchSuccessResponse = {
        data: [
          { id: 'aabeeefc-bd13-474a-a440-0ee139b3a4cc' },
          { id: 'aebe1c6e-30ad-4257-993b-519f5affa626' },
          { id: 'b2bc2598-f98b-4da4-86c9-7b32881ef394' },
        ],
      };
      mockSuccessResponse(response, {
        headers: {
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

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
      const response: CreateBatchSuccessResponse = {
        data: [
          {
            id: 'not-idempotent-123',
          },
        ],
      };

      mockSuccessResponse(response, {
        headers: {
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

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

      //@ts-ignore
      const hasIdempotencyKey = lastCall[1]?.headers.has('Idempotency-Key');
      expect(hasIdempotencyKey).toBeFalsy();

      //@ts-ignore
      const usedIdempotencyKey = lastCall[1]?.headers.get('Idempotency-Key');
      expect(usedIdempotencyKey).toBeNull();
    });

    it('sends the Idempotency-Key header when idempotencyKey is provided', async () => {
      const response: CreateBatchSuccessResponse = {
        data: [
          {
            id: 'idempotent-123',
          },
        ],
      };

      mockSuccessResponse(response, {
        headers: {
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

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

      //@ts-ignore
      const hasIdempotencyKey = lastCall[1]?.headers.has('Idempotency-Key');
      expect(hasIdempotencyKey).toBeTruthy();

      //@ts-ignore
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
      const response: CreateBatchSuccessResponse = {
        data: [
          { id: 'aabeeefc-bd13-474a-a440-0ee139b3a4cc' },
          { id: 'aebe1c6e-30ad-4257-993b-519f5affa626' },
          { id: 'b2bc2598-f98b-4da4-86c9-7b32881ef394' },
        ],
      };

      mockSuccessResponse(response, {
        headers: {
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

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
      const response: CreateBatchSuccessResponse = {
        data: [
          {
            id: 'not-idempotent-123',
          },
        ],
      };

      mockSuccessResponse(response, {
        headers: {
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

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

      //@ts-ignore
      const hasIdempotencyKey = lastCall[1]?.headers.has('Idempotency-Key');
      expect(hasIdempotencyKey).toBeFalsy();

      //@ts-ignore
      const usedIdempotencyKey = lastCall[1]?.headers.get('Idempotency-Key');
      expect(usedIdempotencyKey).toBeNull();
    });

    it('sends the Idempotency-Key header when idempotencyKey is provided', async () => {
      const response: CreateBatchSuccessResponse = {
        data: [
          {
            id: 'idempotent-123',
          },
        ],
      };

      mockSuccessResponse(response, {
        headers: {
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

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

      // Check if headers contains Idempotency-Key
      // In the mock, headers is an object with key-value pairs
      expect(fetchMock.mock.calls[0][1]?.headers).toBeDefined();

      //@ts-ignore
      const hasIdempotencyKey = lastCall[1]?.headers.has('Idempotency-Key');
      expect(hasIdempotencyKey).toBeTruthy();

      //@ts-ignore
      const usedIdempotencyKey = lastCall[1]?.headers.get('Idempotency-Key');
      expect(usedIdempotencyKey).toBe(idempotencyKey);
    });
  });
});
