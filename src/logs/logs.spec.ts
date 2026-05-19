import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type { GetLogResponseSuccess } from './interfaces/get-log.interface';
import type { ListLogsResponseSuccess } from './interfaces/list-logs.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Logs', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('list', () => {
    const response: ListLogsResponseSuccess = {
      object: 'list',
      has_more: false,
      data: [
        {
          id: '3d4a472d-bc6d-4dd2-aa9d-d3d11b549e55',
          created_at: '2024-11-01T18:10:00.000Z',
          endpoint: '/emails',
          method: 'POST',
          response_status: 200,
          user_agent: 'resend-node:4.0.0',
        },
        {
          id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
          created_at: '2024-11-01T18:09:00.000Z',
          endpoint: '/emails/batch',
          method: 'POST',
          response_status: 200,
          user_agent: null,
        },
      ],
    };

    describe('when no pagination options are provided', () => {
      it('lists logs', async () => {
        mockSuccessResponse(response, {
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = await resend.logs.list();
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/logs',
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
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.logs.list({ limit: 10 });
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/logs?limit=10',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });

      it('passes after param and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.logs.list({
          limit: 5,
          after: '3d4a472d-bc6d-4dd2-aa9d-d3d11b549e55',
        });
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/logs?limit=5&after=3d4a472d-bc6d-4dd2-aa9d-d3d11b549e55',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });

      it('passes before param and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.logs.list({
          limit: 5,
          before: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        });
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/logs?limit=5&before=a1b2c3d4-e5f6-7890-abcd-ef1234567890',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });
    });
  });

  describe('get', () => {
    it('gets a log by id', async () => {
      const response: GetLogResponseSuccess = {
        object: 'log',
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d11b549e55',
        created_at: '2024-11-01T18:10:00.000Z',
        endpoint: '/emails',
        method: 'POST',
        response_status: 200,
        user_agent: 'resend-node:4.0.0',
        request_body: { from: 'user@example.com', to: 'recipient@example.com' },
        response_body: { id: 'email_123' },
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.logs.get('3d4a472d-bc6d-4dd2-aa9d-d3d11b549e55'),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "created_at": "2024-11-01T18:10:00.000Z",
            "endpoint": "/emails",
            "id": "3d4a472d-bc6d-4dd2-aa9d-d3d11b549e55",
            "method": "POST",
            "object": "log",
            "request_body": {
              "from": "user@example.com",
              "to": "recipient@example.com",
            },
            "response_body": {
              "id": "email_123",
            },
            "response_status": 200,
            "user_agent": "resend-node:4.0.0",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error when log not found', async () => {
      const response: ErrorResponse = {
        name: 'not_found',
        message: 'Log not found',
        statusCode: 404,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 404,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.logs.get('34bd250e-615a-400c-be11-5912572ee15b'),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "Log not found",
            "name": "not_found",
            "statusCode": 404,
          },
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error for invalid id', async () => {
      const response: ErrorResponse = {
        name: 'validation_error',
        message: 'The `logId` must be a valid UUID.',
        statusCode: 422,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 422,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.logs.get('invalid-id'),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "The \`logId\` must be a valid UUID.",
            "name": "validation_error",
            "statusCode": 422,
          },
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });
  });
});
