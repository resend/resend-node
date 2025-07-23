import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type {
  CreateEmailOptions,
  CreateEmailResponseSuccess,
} from './interfaces/create-email-options.interface';
import type { GetEmailResponseSuccess } from './interfaces/get-email-options.interface';
import type { ListEmailsResponseSuccess } from './interfaces/list-emails-options.interface';

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

describe('Emails', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('create', () => {
    it('sends email', async () => {
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

      const data = await resend.emails.create({} as CreateEmailOptions);

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

    it('does not send the Idempotency-Key header when idempotencyKey is not provided', async () => {
      const response: CreateEmailResponseSuccess = {
        id: 'not-idempotent-123',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

      const payload: CreateEmailOptions = {
        from: 'admin@resend.com',
        to: 'user@resend.com',
        subject: 'Not Idempotent Test',
        html: '<h1>Test</h1>',
        topicId: '9f31e56e-3083-46cf-8e96-c6995e0e576a',
      };

      await resend.emails.create(payload);

      // Inspect the last fetch call and body
      const lastCall = fetchMock.mock.calls[0];
      expect(lastCall).toBeDefined();
      const request = lastCall[1];
      expect(request).toBeDefined();

      // Make sure the topic_id is included in the body
      expect(lastCall[1]?.body).toEqual(
        '{"from":"admin@resend.com","html":"<h1>Test</h1>","subject":"Not Idempotent Test","to":"user@resend.com","topic_id":"9f31e56e-3083-46cf-8e96-c6995e0e576a"}',
      );

      //@ts-ignore
      const hasIdempotencyKey = lastCall[1]?.headers.has('Idempotency-Key');
      expect(hasIdempotencyKey).toBeFalsy();

      //@ts-expect-error
      const usedIdempotencyKey = lastCall[1]?.headers.get('Idempotency-Key');
      expect(usedIdempotencyKey).toBeNull();
    });

    it('sends the Idempotency-Key header when idempotencyKey is provided', async () => {
      const response: CreateEmailResponseSuccess = {
        id: 'idempotent-123',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

      const payload: CreateEmailOptions = {
        from: 'admin@resend.com',
        to: 'user@resend.com',
        subject: 'Idempotency Test',
        html: '<h1>Test</h1>',
      };
      const idempotencyKey = 'unique-key-123';

      await resend.emails.create(payload, { idempotencyKey });

      // Inspect the last fetch call and body
      const lastCall = fetchMock.mock.calls[0];
      expect(lastCall).toBeDefined();

      const headers = new Headers(lastCall[1]?.headers);
      expect(headers.has('Idempotency-Key')).toBe(true);
      expect(headers.get('Idempotency-Key')).toBe(idempotencyKey);
    });
  });

  describe('send', () => {
    it('sends email', async () => {
      const response: CreateEmailResponseSuccess = {
        id: '71cdfe68-cf79-473a-a9d7-21f91db6a526',
      };
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
        },
      });

      const payload: CreateEmailOptions = {
        from: 'bu@resend.com',
        to: 'zeno@resend.com',
        subject: 'Hello World',
        html: '<h1>Hello world</h1>',
      };

      const data = await resend.emails.send(payload);
      expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "id": "71cdfe68-cf79-473a-a9d7-21f91db6a526",
  },
  "error": null,
}
`);
    });

    it('sends email with multiple recipients', async () => {
      const response: CreateEmailResponseSuccess = {
        id: '124dc0f1-e36c-417c-a65c-e33773abc768',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const payload: CreateEmailOptions = {
        from: 'admin@resend.com',
        to: ['bu@resend.com', 'zeno@resend.com'],
        subject: 'Hello World',
        text: 'Hello world',
      };
      const data = await resend.emails.send(payload);
      expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "id": "124dc0f1-e36c-417c-a65c-e33773abc768",
  },
  "error": null,
}
`);
    });

    it('sends email with multiple bcc recipients', async () => {
      const response: CreateEmailResponseSuccess = {
        id: '124dc0f1-e36c-417c-a65c-e33773abc768',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const payload: CreateEmailOptions = {
        from: 'admin@resend.com',
        to: 'bu@resend.com',
        bcc: ['foo@resend.com', 'bar@resend.com'],
        subject: 'Hello World',
        text: 'Hello world',
      };

      const data = await resend.emails.send(payload);
      expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "id": "124dc0f1-e36c-417c-a65c-e33773abc768",
  },
  "error": null,
}
`);
    });

    it('sends email with multiple cc recipients', async () => {
      const response: CreateEmailResponseSuccess = {
        id: '124dc0f1-e36c-417c-a65c-e33773abc768',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const payload: CreateEmailOptions = {
        from: 'admin@resend.com',
        to: 'bu@resend.com',
        cc: ['foo@resend.com', 'bar@resend.com'],
        subject: 'Hello World',
        text: 'Hello world',
      };

      const data = await resend.emails.send(payload);
      expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "id": "124dc0f1-e36c-417c-a65c-e33773abc768",
  },
  "error": null,
}
`);
    });

    it('sends email with multiple replyTo emails', async () => {
      const response: CreateEmailResponseSuccess = {
        id: '124dc0f1-e36c-417c-a65c-e33773abc768',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const payload: CreateEmailOptions = {
        from: 'admin@resend.com',
        to: 'bu@resend.com',
        replyTo: ['foo@resend.com', 'bar@resend.com'],
        subject: 'Hello World',
        text: 'Hello world',
      };

      const data = await resend.emails.send(payload);
      expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "id": "124dc0f1-e36c-417c-a65c-e33773abc768",
  },
  "error": null,
}
`);
    });

    it('can send an email with headers', async () => {
      const response: CreateEmailResponseSuccess = {
        id: '124dc0f1-e36c-417c-a65c-e33773abc768',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const payload: CreateEmailOptions = {
        from: 'admin@resend.com',
        headers: {
          'X-Entity-Ref-ID': '123',
        },
        subject: 'Hello World',
        text: 'Hello world',
        to: 'bu@resend.com',
      };

      const data = await resend.emails.send(payload);
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

      const payload: CreateEmailOptions = {
        from: 'resend.com', // Invalid from address
        to: 'bu@resend.com',
        replyTo: ['foo@resend.com', 'bar@resend.com'],
        subject: 'Hello World',
        text: 'Hello world',
      };

      const result = resend.emails.send(payload);

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

      const result = await resend.emails.send({
        from: 'example@resend.com',
        to: 'bu@resend.com',
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

      const result = await resend.emails.send({
        from: 'example@resend.com',
        to: 'bu@resend.com',
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

    describe('template emails', () => {
      it('sends email with template id only', async () => {
        const response: CreateEmailResponseSuccess = {
          id: 'template-email-123',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        });

        const payload: CreateEmailOptions = {
          template: {
            id: 'welcome-template-123',
          },
          to: 'user@example.com',
        };

        const data = await resend.emails.send(payload);
        expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "id": "template-email-123",
  },
  "error": null,
}
`);

        // Verify the correct API payload was sent
        const lastCall = fetchMock.mock.calls[0];
        const requestBody = JSON.parse(lastCall[1]?.body as string);
        expect(requestBody).toEqual({
          template: {
            id: 'welcome-template-123',
          },
          to: 'user@example.com',
        });
      });

      it('sends email with template id and variables', async () => {
        const response: CreateEmailResponseSuccess = {
          id: 'template-vars-email-456',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        });

        const payload: CreateEmailOptions = {
          template: {
            id: 'welcome-template-123',
            variables: {
              name: 'John Doe',
              company: 'Acme Corp',
              welcomeBonus: 100,
              isPremium: true,
            },
          },
          to: 'user@example.com',
        };

        const data = await resend.emails.send(payload);
        expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "id": "template-vars-email-456",
  },
  "error": null,
}
`);

        // Verify the correct API payload was sent
        const lastCall = fetchMock.mock.calls[0];
        const requestBody = JSON.parse(lastCall[1]?.body as string);
        expect(requestBody).toEqual({
          template: {
            id: 'welcome-template-123',
            variables: {
              name: 'John Doe',
              company: 'Acme Corp',
              welcomeBonus: 100,
              isPremium: true,
            },
          },
          to: 'user@example.com',
        });
      });

      it('sends template email with optional from and subject', async () => {
        const response: CreateEmailResponseSuccess = {
          id: 'template-with-overrides-789',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        });

        const payload: CreateEmailOptions = {
          template: {
            id: 'welcome-template-123',
            variables: {
              name: 'Jane Smith',
            },
          },
          from: 'custom@example.com',
          subject: 'Custom Subject Override',
          to: 'user@example.com',
        };

        const data = await resend.emails.send(payload);
        expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "id": "template-with-overrides-789",
  },
  "error": null,
}
`);

        // Verify the correct API payload was sent
        const lastCall = fetchMock.mock.calls[0];
        const requestBody = JSON.parse(lastCall[1]?.body as string);
        expect(requestBody).toEqual({
          template: {
            id: 'welcome-template-123',
            variables: {
              name: 'Jane Smith',
            },
          },
          from: 'custom@example.com',
          subject: 'Custom Subject Override',
          to: 'user@example.com',
        });
      });

      it('handles template email errors correctly', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Template not found',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        });

        const payload: CreateEmailOptions = {
          template: {
            id: 'invalid-template-123',
          },
          to: 'user@example.com',
        };

        const result = await resend.emails.send(payload);
        expect(result).toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Template not found",
    "name": "not_found",
  },
}
`);
      });
    });
  });

  describe('get', () => {
    describe('when email not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Email not found',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        });

        const result = resend.emails.get(
          '61cda979-919d-4b9d-9638-c148b93ff410',
        );

        await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Email not found",
    "name": "not_found",
  },
}
`);
      });
    });

    describe('when email found', () => {
      it('returns emails with only to', async () => {
        const response: GetEmailResponseSuccess = {
          object: 'email',
          id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: ['zeno@resend.com'],
          from: 'bu@resend.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
          subject: 'Test email',
          html: '<p>hello hello</p>',
          text: null,
          bcc: null,
          cc: null,
          reply_to: null,
          last_event: 'delivered',
          scheduled_at: null,
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        });

        await expect(
          resend.emails.get('67d9bcdb-5a02-42d7-8da9-0d6feea18cff'),
        ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "bcc": null,
    "cc": null,
    "created_at": "2023-04-07T23:13:52.669661+00:00",
    "from": "bu@resend.com",
    "html": "<p>hello hello</p>",
    "id": "67d9bcdb-5a02-42d7-8da9-0d6feea18cff",
    "last_event": "delivered",
    "object": "email",
    "reply_to": null,
    "scheduled_at": null,
    "subject": "Test email",
    "text": null,
    "to": [
      "zeno@resend.com",
    ],
  },
  "error": null,
}
`);
      });

      it('returns emails with to and multiple cc', async () => {
        const response: GetEmailResponseSuccess = {
          object: 'email',
          id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: ['zeno@resend.com'],
          from: 'bu@resend.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
          subject: 'Test email',
          html: '<p>hello hello</p>',
          text: null,
          bcc: null,
          cc: ['zeno@resend.com', 'bu@resend.com'],
          reply_to: null,
          last_event: 'delivered',
          scheduled_at: null,
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        });

        await expect(
          resend.emails.get('67d9bcdb-5a02-42d7-8da9-0d6feea18cff'),
        ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "bcc": null,
    "cc": [
      "zeno@resend.com",
      "bu@resend.com",
    ],
    "created_at": "2023-04-07T23:13:52.669661+00:00",
    "from": "bu@resend.com",
    "html": "<p>hello hello</p>",
    "id": "67d9bcdb-5a02-42d7-8da9-0d6feea18cff",
    "last_event": "delivered",
    "object": "email",
    "reply_to": null,
    "scheduled_at": null,
    "subject": "Test email",
    "text": null,
    "to": [
      "zeno@resend.com",
    ],
  },
  "error": null,
}
`);
      });
    });
  });

  describe('list', () => {
    const response: ListEmailsResponseSuccess = {
      object: 'list',
      has_more: false,
      data: [
        {
          id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: ['zeno@resend.com'],
          from: 'bu@resend.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
          subject: 'Test email',
          bcc: null,
          cc: null,
          reply_to: null,
          last_event: 'delivered',
          scheduled_at: null,
        },
      ],
    };
    const headers = {
      Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
    };

    describe('when no pagination options provided', () => {
      it('calls endpoint without query params and return the response', async () => {
        mockSuccessResponse(response, {
          headers,
        });

        const result = await resend.emails.list();
        expect(result).toEqual({
          data: response,
          error: null,
        });
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails',
        );
      });
    });

    describe('when pagination options are provided', () => {
      it('calls endpoint passing limit param and return the response', async () => {
        mockSuccessResponse(response, { headers });
        const result = await resend.emails.list({ limit: 10 });
        expect(result).toEqual({
          data: response,
          error: null,
        });
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails?limit=10',
        );
      });

      it('calls endpoint passing after param and return the response', async () => {
        mockSuccessResponse(response, { headers });
        const result = await resend.emails.list({ after: 'cursor123' });
        expect(result).toEqual({
          data: response,
          error: null,
        });
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails?after=cursor123',
        );
      });

      it('calls endpoint passing before param and return the response', async () => {
        mockSuccessResponse(response, { headers });
        const result = await resend.emails.list({ before: 'cursor123' });
        expect(result).toEqual({
          data: response,
          error: null,
        });
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails?before=cursor123',
        );
      });
    });
  });
});
