import { enableFetchMocks } from 'jest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import type {
  CreateBroadcastOptions,
  CreateBroadcastResponseSuccess,
} from './interfaces/create-broadcast-options.interface';

enableFetchMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

describe('Broadcasts', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('create', () => {
    it('missing `from`', async () => {
      const response: ErrorResponse = {
        name: 'missing_required_field',
        message: 'Missing `from` field.',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 422,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

      const data = await resend.broadcasts.create({} as CreateBroadcastOptions);
      console.log({ data });
      expect(data).toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing \`from\` field.",
    "name": "missing_required_field",
  },
}
`);
    });

    it('creates broadcast', async () => {
      const response: CreateBroadcastResponseSuccess = {
        id: '71cdfe68-cf79-473a-a9d7-21f91db6a526',
      };
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

      const payload: CreateBroadcastOptions = {
        from: 'bu@resend.com',
        audienceId: '0192f4ed-c2e9-7112-9c13-b04a043e23ee',
        subject: 'Hello World',
        html: '<h1>Hello world</h1>',
      };

      const data = await resend.broadcasts.create(payload);
      expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "id": "71cdfe68-cf79-473a-a9d7-21f91db6a526",
  },
  "error": null,
}
`);
    });

    it('creates broadcast with multiple recipients', async () => {
      const response: CreateBroadcastResponseSuccess = {
        id: '124dc0f1-e36c-417c-a65c-e33773abc768',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const payload: CreateBroadcastOptions = {
        from: 'admin@resend.com',
        audienceId: '0192f4f1-d5f9-7110-8eb5-370552515917',
        subject: 'Hello World',
        text: 'Hello world',
      };
      const data = await resend.broadcasts.create(payload);
      expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "id": "124dc0f1-e36c-417c-a65c-e33773abc768",
  },
  "error": null,
}
`);
    });

    it('creates broadcast with multiple replyTo emails', async () => {
      const response: CreateBroadcastResponseSuccess = {
        id: '124dc0f1-e36c-417c-a65c-e33773abc768',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const payload: CreateBroadcastOptions = {
        from: 'admin@resend.com',
        audienceId: '0192f4f1-d5f9-7110-8eb5-370552515917',
        replyTo: ['foo@resend.com', 'bar@resend.com'],
        subject: 'Hello World',
        text: 'Hello world',
      };

      const data = await resend.broadcasts.create(payload);
      expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "id": "124dc0f1-e36c-417c-a65c-e33773abc768",
  },
  "error": null,
}
`);
    });

    it('throws an error when an ErrorResponse is returned', async () => {
      const response: ErrorResponse = {
        name: 'invalid_parameter',
        message:
          'Invalid `from` field. The email address needs to follow the `email@example.com` or `Name <email@example.com>` format',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 422,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const payload: CreateBroadcastOptions = {
        from: 'resend.com', // Invalid from address
        audienceId: '0192f4f1-d5f9-7110-8eb5-370552515917',
        replyTo: ['foo@resend.com', 'bar@resend.com'],
        subject: 'Hello World',
        text: 'Hello world',
      };

      const result = resend.broadcasts.create(payload);

      await expect(result).resolves.toMatchInlineSnapshot(`
  {
    "data": null,
    "error": {
      "message": "Invalid \`from\` field. The email address needs to follow the \`email@example.com\` or \`Name <email@example.com>\` format",
      "name": "invalid_parameter",
    },
  }
  `);
    });

    it('returns an error when fetch fails', async () => {
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        RESEND_BASE_URL: 'http://invalidurl.noturl',
      };

      const result = await resend.broadcasts.create({
        from: 'example@resend.com',
        audienceId: '0192f4f1-d5f9-7110-8eb5-370552515917',
        subject: 'Hello World',
        text: 'Hello world',
      });

      expect(result).toEqual(
        expect.objectContaining({
          data: null,
          error: {
            message: 'Unable to fetch data. The request could not be resolved.',
            name: 'application_error',
          },
        }),
      );
      process.env = originalEnv;
    });

    it('returns an error when api responds with text payload', async () => {
      fetchMock.mockOnce('local_rate_limited', {
        status: 422,
        headers: {
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const result = await resend.broadcasts.create({
        from: 'example@resend.com',
        audienceId: '0192f4f1-d5f9-7110-8eb5-370552515917',
        subject: 'Hello World',
        text: 'Hello world',
      });

      expect(result).toEqual(
        expect.objectContaining({
          data: null,
          error: {
            message:
              'Internal server error. We are unable to process your request right now, please try again later.',
            name: 'application_error',
          },
        }),
      );
    });
  });
});
