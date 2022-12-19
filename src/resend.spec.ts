import { Resend } from './resend';
import MockAdapater from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapater(axios);
const resend = new Resend('re_924b3rjh2387fbewf823');

describe('Resend', () => {
  afterEach(() => mock.resetHistory());

  it('throws API key error', () => {
    expect(() => new Resend()).toThrowErrorMatchingSnapshot();
  });

  it('sends email', async () => {
    const payload = {
      from: 'bu@resend.com',
      to: 'zeno@resend.com',
      subject: 'Hello World',
    };
    mock.onPost('https://api.resend.com/email', payload).replyOnce(200, {
      id: '1234',
      from: 'bu@resend.com',
      to: 'zeno@resend.com',
      created_at: '123',
    });

    const data = await resend.sendEmail(payload);
    expect(data).toMatchSnapshot();
  });

  it('sends email with multiple recipients', async () => {
    const payload = {
      from: 'admin@resend.com',
      to: ['bu@resend.com', 'zeno@resend.com'],
      subject: 'Hello World',
    };
    mock.onPost('https://api.resend.com/email', payload).replyOnce(200, {
      id: '1234',
      from: 'admin@resend.com',
      to: ['bu@resend.com', 'zeno@resend.com'],
      created_at: '123',
    });

    const data = await resend.sendEmail(payload);
    expect(data).toMatchSnapshot();
  });

  it('sends email with multiple bcc recipients', async () => {
    const payload = {
      from: 'admin@resend.com',
      to: 'bu@resend.com',
      bcc: ['foo@resend.com', 'bar@resend.com'],
      subject: 'Hello World',
    };
    mock.onPost('https://api.resend.com/email', payload).replyOnce(200, {
      id: '1234',
      from: 'admin@resend.com',
      to: 'bu@resend.com',
      bcc: ['foo@resend.com', 'bar@resend.com'],
      created_at: '123',
    });

    const data = await resend.sendEmail(payload);
    expect(data).toMatchSnapshot();
  });

  it('sends email with multiple cc recipients', async () => {
    const payload = {
      from: 'admin@resend.com',
      to: 'bu@resend.com',
      cc: ['foo@resend.com', 'bar@resend.com'],
      subject: 'Hello World',
    };
    mock.onPost('https://api.resend.com/email', payload).replyOnce(200, {
      id: '1234',
      from: 'admin@resend.com',
      to: 'bu@resend.com',
      cc: ['foo@resend.com', 'bar@resend.com'],
      created_at: '123',
    });

    const data = await resend.sendEmail(payload);
    expect(data).toMatchSnapshot();
  });
});
