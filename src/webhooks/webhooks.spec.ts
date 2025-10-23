import { Webhook } from 'svix';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type {
  CreateWebhookOptions,
  CreateWebhookResponseSuccess,
} from './interfaces/create-webhook-options.interface';
import type { GetWebhookResponseSuccess } from './interfaces/get-webhook.interface';
import type { ListWebhooksResponseSuccess } from './interfaces/list-webhooks.interface';
import type { RemoveWebhookResponseSuccess } from './interfaces/remove-webhook.interface';

const mocks = vi.hoisted(() => {
  const verify = vi.fn();
  const webhookConstructor = vi.fn(() => ({
    verify,
  }));

  return {
    verify,
    webhookConstructor,
  };
});

vi.mock('svix', () => ({
  Webhook: mocks.webhookConstructor,
}));

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Webhooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.verify.mockReset();
    fetchMock.resetMocks();
  });

  afterAll(() => fetchMocker.disableMocks());

  describe('create', () => {
    it('creates a webhook', async () => {
      const payload: CreateWebhookOptions = {
        endpoint: 'https://example.com/webhook',
        events: ['email.sent', 'email.delivered'],
      };
      const response: CreateWebhookResponseSuccess = {
        object: 'webhook',
        id: '430eed87-632a-4ea6-90db-0aace67ec228',
        signing_secret: 'whsec_test_secret_key_123',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 201,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.webhooks.create(payload),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "id": "430eed87-632a-4ea6-90db-0aace67ec228",
    "object": "webhook",
    "signing_secret": "whsec_test_secret_key_123",
  },
  "error": null,
}
`);
    });
  });

  describe('get', () => {
    describe('when webhook not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Webhook endpoint not found',
          statusCode: 404,
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = resend.webhooks.get('1234');

        await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Webhook endpoint not found",
    "name": "not_found",
    "statusCode": 404,
  },
}
`);
      });
    });

    it('gets a webhook', async () => {
      const response: GetWebhookResponseSuccess = {
        object: 'webhook',
        id: '430eed87-632a-4ea6-90db-0aace67ec228',
        created_at: '2023-06-21T06:10:36.144Z',
        status: 'enabled',
        endpoint: 'https://example.com/webhook',
        events: ['email.sent', 'email.delivered'],
        signing_secret: 'whsec_test_secret_key_123',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.webhooks.get('1234')).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "created_at": "2023-06-21T06:10:36.144Z",
    "endpoint": "https://example.com/webhook",
    "events": [
      "email.sent",
      "email.delivered",
    ],
    "id": "430eed87-632a-4ea6-90db-0aace67ec228",
    "object": "webhook",
    "signing_secret": "whsec_test_secret_key_123",
    "status": "enabled",
  },
  "error": null,
}
`);
    });
  });

  describe('list', () => {
    const response: ListWebhooksResponseSuccess = {
      has_more: false,
      object: 'list',
      data: [
        {
          id: '430eed87-632a-4ea6-90db-0aace67ec228',
          endpoint: 'https://example.com/webhook',
          created_at: '2023-06-21T06:10:36.144Z',
          status: 'enabled',
          events: ['email.sent', 'email.delivered'],
        },
        {
          id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
          endpoint: 'https://example.com/webhook2',
          created_at: '2023-06-20T06:10:36.144Z',
          status: 'enabled',
          events: ['email.bounced'],
        },
      ],
    };

    describe('when no pagination options are provided', () => {
      it('lists webhooks', async () => {
        mockSuccessResponse(response, {
          headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = await resend.webhooks.list();
        expect(result).toEqual({
          data: response,
          error: null,
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/webhooks',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });
    });

    describe('when pagination options are provided', () => {
      it('passes limit param and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = await resend.webhooks.list({ limit: 10 });
        expect(result).toEqual({
          data: response,
          error: null,
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/webhooks?limit=10',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });
    });
  });

  describe('remove', () => {
    it('removes a webhook', async () => {
      const id = '430eed87-632a-4ea6-90db-0aace67ec228';
      const response: RemoveWebhookResponseSuccess = {
        object: 'webhook',
        id,
        deleted: true,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.webhooks.remove(id)).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "deleted": true,
    "id": "430eed87-632a-4ea6-90db-0aace67ec228",
    "object": "webhook",
  },
  "error": null,
}
`);
    });

    describe('when webhook not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Webhook not found',
          statusCode: 404,
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = resend.webhooks.remove('1234');

        await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Webhook not found",
    "name": "not_found",
    "statusCode": 404,
  },
}
`);
      });
    });
  });

  describe('verify', () => {
    it('verifies payload using svix headers', () => {
      const options = {
        payload: '{"type":"email.sent"}',
        headers: {
          id: 'msg_123',
          timestamp: '1713984875',
          signature: 'v1,some-signature',
        },
        webhookSecret: 'whsec_123',
      };

      const expectedResult = { id: 'msg_123', status: 'verified' };
      mocks.verify.mockReturnValue(expectedResult);

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const result = resend.webhooks.verify(options);

      expect(Webhook).toHaveBeenCalledWith(options.webhookSecret);
      expect(mocks.verify).toHaveBeenCalledWith(options.payload, {
        'svix-id': options.headers.id,
        'svix-timestamp': options.headers.timestamp,
        'svix-signature': options.headers.signature,
      });
      expect(result).toBe(expectedResult);
    });
  });
});
