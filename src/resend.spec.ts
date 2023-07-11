import { Resend } from './resend';
import MockAdapater from 'axios-mock-adapter';
import axios from 'axios';
import { CreateEmailOptions } from './emails/interfaces';

const mock = new MockAdapater(axios);
const resend = new Resend('re_924b3rjh2387fbewf823');

describe('Resend', () => {
  afterEach(() => mock.resetHistory());

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
    mock.onPost('/emails', payload).replyOnce(200, {
      id: '1234',
      from: 'bu@resend.com',
      to: 'zeno@resend.com',
      created_at: '123',
    });

    const data = await resend.emails.send(payload);
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
    mock.onPost('/emails', payload).replyOnce(200, {
      id: '1234',
      from: 'admin@resend.com',
      to: ['bu@resend.com', 'zeno@resend.com'],
      created_at: '123',
    });

    const data = await resend.emails.send(payload);
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
    mock.onPost('/emails', payload).replyOnce(200, {
      id: '1234',
      from: 'admin@resend.com',
      to: 'bu@resend.com',
      bcc: ['foo@resend.com', 'bar@resend.com'],
      created_at: '123',
    });

    const data = await resend.emails.send(payload);
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
    mock.onPost('/emails', payload).replyOnce(200, {
      id: '1234',
      from: 'admin@resend.com',
      to: 'bu@resend.com',
      cc: ['foo@resend.com', 'bar@resend.com'],
      created_at: '123',
    });

    const data = await resend.emails.send(payload);
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
    const apiPayload: CreateEmailOptions = {
      from: 'admin@resend.com',
      to: 'bu@resend.com',
      reply_to: ['foo@resend.com', 'bar@resend.com'],
      subject: 'Hello World',
      text: 'Hello world',
    };

    mock.onPost('/emails', apiPayload).replyOnce(200, {
      id: '1234',
      from: 'admin@resend.com',
      to: 'bu@resend.com',
      reply_to: ['foo@resend.com', 'bar@resend.com'],
      created_at: '123',
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
    mock.onPost('/emails', payload).replyOnce(200, {
      id: '1234',
    });

    const data = await resend.emails.send(payload);
    expect(data).toMatchInlineSnapshot(`
      {
        "id": "1234",
      }
    `);
  });
});
