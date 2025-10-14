import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type {
  CreateBroadcastOptions,
  CreateBroadcastResponseSuccess,
} from './interfaces/create-broadcast-options.interface';
import type { GetBroadcastResponseSuccess } from './interfaces/get-broadcast.interface';
import type { ListBroadcastsResponseSuccess } from './interfaces/list-broadcasts.interface';
import type { RemoveBroadcastResponseSuccess } from './interfaces/remove-broadcast.interface';
import type { UpdateBroadcastResponseSuccess } from './interfaces/update-broadcast.interface';

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

  describe('send', () => {
    it('sends a broadcast successfully', async () => {
      const randomBroadcastId = 'b01e0de9-7c27-4a53-bf38-2e3f98389a65';
      const response = {
        id: randomBroadcastId,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

      const data = await resend.broadcasts.send(randomBroadcastId);

      expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "id": "b01e0de9-7c27-4a53-bf38-2e3f98389a65",
  },
  "error": null,
}
`);
    });
  });

  describe('list', () => {
    const response: ListBroadcastsResponseSuccess = {
      object: 'list',
      has_more: false,
      data: [
        {
          id: '49a3999c-0ce1-4ea6-ab68-afcd6dc2e794',
          audience_id: '78261eea-8f8b-4381-83c6-79fa7120f1cf',
          name: 'broadcast 1',
          status: 'draft',
          created_at: '2024-11-01T15:13:31.723Z',
          scheduled_at: null,
          sent_at: null,
        },
        {
          id: '559ac32e-9ef5-46fb-82a1-b76b840c0f7b',
          audience_id: '78261eea-8f8b-4381-83c6-79fa7120f1cf',
          name: 'broadcast 2',
          status: 'sent',
          created_at: '2024-12-01T19:32:22.980Z',
          scheduled_at: '2024-12-02T19:32:22.980Z',
          sent_at: '2024-12-02T19:32:22.980Z',
        },
      ],
    };

    describe('when no pagination options are provided', () => {
      it('lists broadcasts', async () => {
        mockSuccessResponse(response, {
          headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = await resend.broadcasts.list();
        expect(result).toEqual({
          data: response,
          error: null,
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/broadcasts',
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
        const result = await resend.broadcasts.list({ limit: 1 });
        expect(result).toEqual({
          data: response,
          error: null,
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/broadcasts?limit=1',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });

      it('passes after param and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.broadcasts.list({
          limit: 1,
          after: 'cursor-value',
        });
        expect(result).toEqual({
          data: response,
          error: null,
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/broadcasts?limit=1&after=cursor-value',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });

      it('passes before param and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.broadcasts.list({
          limit: 1,
          before: 'cursor-value',
        });
        expect(result).toEqual({
          data: response,
          error: null,
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/broadcasts?limit=1&before=cursor-value',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });
    });
  });

  describe('get', () => {
    describe('when broadcast not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Broadcast not found',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = resend.broadcasts.get(
          '559ac32e-9ef5-46fb-82a1-b76b840c0f7b',
        );

        await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Broadcast not found",
    "name": "not_found",
  },
}
`);
      });
    });

    it('get broadcast', async () => {
      const response: GetBroadcastResponseSuccess = {
        object: 'broadcast',
        id: '559ac32e-9ef5-46fb-82a1-b76b840c0f7b',
        name: 'Announcements',
        audience_id: '78261eea-8f8b-4381-83c6-79fa7120f1cf',
        from: 'Acme <onboarding@resend.dev>',
        html: '<h1>Hello world</h1>',
        subject: 'hello world',
        reply_to: null,
        preview_text: 'Check out our latest announcements',
        status: 'draft',
        created_at: '2024-12-01T19:32:22.980Z',
        scheduled_at: null,
        sent_at: null,
        text: 'Hello world',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.broadcasts.get('559ac32e-9ef5-46fb-82a1-b76b840c0f7b'),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "audience_id": "78261eea-8f8b-4381-83c6-79fa7120f1cf",
    "created_at": "2024-12-01T19:32:22.980Z",
    "from": "Acme <onboarding@resend.dev>",
    "html": "<h1>Hello world</h1>",
    "id": "559ac32e-9ef5-46fb-82a1-b76b840c0f7b",
    "name": "Announcements",
    "object": "broadcast",
    "preview_text": "Check out our latest announcements",
    "reply_to": null,
    "scheduled_at": null,
    "sent_at": null,
    "status": "draft",
    "subject": "hello world",
    "text": "Hello world",
  },
  "error": null,
}
`);
    });
  });

  describe('remove', () => {
    it('removes a broadcast', async () => {
      const id = 'b01e0de9-7c27-4a53-bf38-2e3f98389a65';
      const response: RemoveBroadcastResponseSuccess = {
        object: 'broadcast',
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

      await expect(
        resend.broadcasts.remove(id),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "deleted": true,
    "id": "b01e0de9-7c27-4a53-bf38-2e3f98389a65",
    "object": "broadcast",
  },
  "error": null,
}
`);
    });
  });

  describe('update', () => {
    it('updates a broadcast', async () => {
      const id = 'b01e0de9-7c27-4a53-bf38-2e3f98389a65';
      const response: UpdateBroadcastResponseSuccess = { id };
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.broadcasts.update(id, { name: 'New Name' }),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "id": "b01e0de9-7c27-4a53-bf38-2e3f98389a65",
  },
  "error": null,
}
`);
    });
  });
});
