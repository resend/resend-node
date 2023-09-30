import { Resend } from './resend';
import { enableFetchMocks } from 'jest-fetch-mock';
import { CreateEmailOptions } from './emails/interfaces';
import { ErrorResponse } from './interfaces';
import { ResendError } from './error';

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
        "created_at": "123",
        "from": "bu@resend.com",
        "id": "1234",
        "to": "zeno@resend.com",
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
        "created_at": "123",
        "from": "admin@resend.com",
        "id": "1234",
        "to": [
          "bu@resend.com",
          "zeno@resend.com",
        ],
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
        "bcc": [
          "foo@resend.com",
          "bar@resend.com",
        ],
        "created_at": "123",
        "from": "admin@resend.com",
        "id": "1234",
        "to": "bu@resend.com",
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
        "cc": [
          "foo@resend.com",
          "bar@resend.com",
        ],
        "created_at": "123",
        "from": "admin@resend.com",
        "id": "1234",
        "to": "bu@resend.com",
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
        "created_at": "123",
        "from": "admin@resend.com",
        "id": "1234",
        "reply_to": [
          "foo@resend.com",
          "bar@resend.com",
        ],
        "to": "bu@resend.com",
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
        "id": "1234",
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

    fetchMock.mockOnce(
      JSON.stringify({
        error: {
          statusCode: 422,
          name: 'invalid_parameter',
          message:
            'Invalid `from` field. The email address needs to follow the `email@example.com` or `Name <email@example.com>` format',
        },
      } satisfies ErrorResponse),
      {
        status: 422,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      },
    );


      const result = resend.emails.send(payload);

      await expect(result).rejects.toBeInstanceOf(ResendError);
      await expect(result).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid `from` field. The email address needs to follow the `email@example.com` or `Name <email@example.com>` format"');
  });
});
