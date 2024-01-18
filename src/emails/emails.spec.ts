import { enableFetchMocks } from 'jest-fetch-mock';
import { Resend } from '../resend';
import { ErrorResponse } from '../interfaces';
import { GetEmailResponseSuccess } from './interfaces/get-email-options.interface';
import {
  CreateEmailOptions,
  CreateEmailResponseSuccess,
} from './interfaces/create-email-options.interface';

enableFetchMocks();

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
        reply_to: ['foo@resend.com', 'bar@resend.com'],
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
        reply_to: ['foo@resend.com', 'bar@resend.com'],
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
          last_event: 'sent',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        });

        await expect(resend.emails.get('67d9bcdb-5a02-42d7-8da9-0d6feea18cff'))
          .resolves.toMatchInlineSnapshot(`
{
  "data": {
    "bcc": null,
    "cc": null,
    "created_at": "2023-04-07T23:13:52.669661+00:00",
    "from": "bu@resend.com",
    "html": "<p>hello hello</p>",
    "id": "67d9bcdb-5a02-42d7-8da9-0d6feea18cff",
    "last_event": "sent",
    "object": "email",
    "reply_to": null,
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
          last_event: 'sent',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        });

        await expect(resend.emails.get('67d9bcdb-5a02-42d7-8da9-0d6feea18cff'))
          .resolves.toMatchInlineSnapshot(`
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
    "last_event": "sent",
    "object": "email",
    "reply_to": null,
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
});
