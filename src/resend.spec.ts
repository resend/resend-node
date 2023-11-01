import { Resend } from './resend';
import { enableFetchMocks } from 'jest-fetch-mock';
import { CreateEmailOptions } from './emails/interfaces';
import { ErrorResponse } from './interfaces';

enableFetchMocks();

const resend = new Resend('re_924b3rjh2387fbewf823');

describe('Resend', () => {
  afterEach(() => fetchMock.resetMocks());

  it('throws API key error', () => {
    expect(() => new Resend()).toThrowErrorMatchingSnapshot();
  });

  it('sends email', async () => {
    const payload: CreateEmailOptions = {
      from: 'bu@resend.com',
      to: 'zeno@resend.com',
      subject: 'Hello World',
      html: '<h1>Hello world</h1>',
    };

    fetchMock.mockOnce(
      JSON.stringify({
        id: '1234',
        from: 'bu@resend.com',
        to: 'zeno@resend.com',
        created_at: '123',
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      },
    );

    const response = await resend.emails.send(payload);
    const data = await response;
    expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "created_at": "123",
    "from": "bu@resend.com",
    "id": "1234",
    "to": "zeno@resend.com",
  },
  "error": null,
}
`);
  });

  it('sends email with multiple recipients', async () => {
    const payload: CreateEmailOptions = {
      from: 'admin@resend.com',
      to: ['bu@resend.com', 'zeno@resend.com'],
      subject: 'Hello World',
      text: 'Hello world',
    };

    fetchMock.mockOnce(
      JSON.stringify({
        id: '1234',
        from: 'admin@resend.com',
        to: ['bu@resend.com', 'zeno@resend.com'],
        created_at: '123',
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      },
    );

    const response = await resend.emails.send(payload);
    const data = await response;
    expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "created_at": "123",
    "from": "admin@resend.com",
    "id": "1234",
    "to": [
      "bu@resend.com",
      "zeno@resend.com",
    ],
  },
  "error": null,
}
`);
  });

  it('sends email with multiple bcc recipients', async () => {
    const payload: CreateEmailOptions = {
      from: 'admin@resend.com',
      to: 'bu@resend.com',
      bcc: ['foo@resend.com', 'bar@resend.com'],
      subject: 'Hello World',
      text: 'Hello world',
    };

    fetchMock.mockOnce(
      JSON.stringify({
        id: '1234',
        from: 'admin@resend.com',
        to: 'bu@resend.com',
        bcc: ['foo@resend.com', 'bar@resend.com'],
        created_at: '123',
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      },
    );

    const response = await resend.emails.send(payload);
    const data = await response;
    expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "bcc": [
      "foo@resend.com",
      "bar@resend.com",
    ],
    "created_at": "123",
    "from": "admin@resend.com",
    "id": "1234",
    "to": "bu@resend.com",
  },
  "error": null,
}
`);
  });

  it('sends email with multiple cc recipients', async () => {
    const payload: CreateEmailOptions = {
      from: 'admin@resend.com',
      to: 'bu@resend.com',
      cc: ['foo@resend.com', 'bar@resend.com'],
      subject: 'Hello World',
      text: 'Hello world',
    };

    fetchMock.mockOnce(
      JSON.stringify({
        id: '1234',
        from: 'admin@resend.com',
        to: 'bu@resend.com',
        cc: ['foo@resend.com', 'bar@resend.com'],
        created_at: '123',
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      },
    );

    const response = await resend.emails.send(payload);
    const data = await response;
    expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "cc": [
      "foo@resend.com",
      "bar@resend.com",
    ],
    "created_at": "123",
    "from": "admin@resend.com",
    "id": "1234",
    "to": "bu@resend.com",
  },
  "error": null,
}
`);
  });

  it('sends email with multiple replyTo emails', async () => {
    const payload: CreateEmailOptions = {
      from: 'admin@resend.com',
      to: 'bu@resend.com',
      reply_to: ['foo@resend.com', 'bar@resend.com'],
      subject: 'Hello World',
      text: 'Hello world',
    };

    fetchMock.mockOnce(
      JSON.stringify({
        id: '1234',
        from: 'admin@resend.com',
        to: 'bu@resend.com',
        reply_to: ['foo@resend.com', 'bar@resend.com'],
        created_at: '123',
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      },
    );

    const response = await resend.emails.send(payload);
    const data = await response;
    expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "created_at": "123",
    "from": "admin@resend.com",
    "id": "1234",
    "reply_to": [
      "foo@resend.com",
      "bar@resend.com",
    ],
    "to": "bu@resend.com",
  },
  "error": null,
}
`);
  });

  it('can send an email with headers', async () => {
    const payload: CreateEmailOptions = {
      from: 'admin@resend.com',
      headers: {
        'X-Entity-Ref-ID': '123',
      },
      subject: 'Hello World',
      text: 'Hello world',
      to: 'bu@resend.com',
    };

    fetchMock.mockOnce(
      JSON.stringify({
        id: '1234',
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      },
    );

    const response = await resend.emails.send(payload);
    const data = await response;
    expect(data).toMatchInlineSnapshot(`
{
  "data": {
    "id": "1234",
  },
  "error": null,
}
`);
  });

  it('throws an error when an ErrorResponse is returned', async () => {
    const payload: CreateEmailOptions = {
      from: 'resend.com', // Invalid from address
      to: 'bu@resend.com',
      reply_to: ['foo@resend.com', 'bar@resend.com'],
      subject: 'Hello World',
      text: 'Hello world',
    };

    const errorResponse: ErrorResponse = {
      name: 'invalid_parameter',
      message:
        'Invalid `from` field. The email address needs to follow the `email@example.com` or `Name <email@example.com>` format',
    };

    fetchMock.mockOnce(JSON.stringify(errorResponse), {
      status: 422,
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer re_924b3rjh2387fbewf823',
      },
    });

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
