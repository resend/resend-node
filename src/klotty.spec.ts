import { Klotty } from './klotty';
import MockAdapater from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapater(axios);
const klotty = new Klotty('kl_924b3rjh2387fbewf823');

describe('Klotty', () => {
  afterEach(() => mock.resetHistory());

  it('throws API key error', () => {
    expect(() => new Klotty()).toThrowErrorMatchingSnapshot();
  });

  it('sends email', async () => {
    const payload = {
      from: 'bu@klotty.com',
      to: 'zeno@klotty.com',
      subject: 'Hello World',
    };
    mock.onPost('https://api.klotty.com/email', payload).replyOnce(200, {
      id: '1234',
      from: 'bu@klotty.com',
      to: 'zeno@klotty.com',
      created_at: '123',
    });

    const data = await klotty.sendEmail(payload);
    expect(data).toMatchSnapshot();
  });

  it('sends email with multiple recipients', async () => {
    const payload = {
      from: 'admin@klotty.com',
      to: ['bu@klotty.com', 'zeno@klotty.com'],
      subject: 'Hello World',
    };
    mock.onPost('https://api.klotty.com/email', payload).replyOnce(200, {
      id: '1234',
      from: 'admin@klotty.com',
      to: ['bu@klotty.com', 'zeno@klotty.com'],
      created_at: '123',
    });

    const data = await klotty.sendEmail(payload);
    expect(data).toMatchSnapshot();
  });

  it('sends email with multiple bcc recipients', async () => {
    const payload = {
      from: 'admin@klotty.com',
      to: 'bu@klotty.com',
      bcc: ['foo@klotty.com', 'bar@klotty.com'],
      subject: 'Hello World',
    };
    mock.onPost('https://api.klotty.com/email', payload).replyOnce(200, {
      id: '1234',
      from: 'admin@klotty.com',
      to: 'bu@klotty.com',
      bcc: ['foo@klotty.com', 'bar@klotty.com'],
      created_at: '123',
    });

    const data = await klotty.sendEmail(payload);
    expect(data).toMatchSnapshot();
  });

  it('sends email with multiple cc recipients', async () => {
    const payload = {
      from: 'admin@klotty.com',
      to: 'bu@klotty.com',
      cc: ['foo@klotty.com', 'bar@klotty.com'],
      subject: 'Hello World',
    };
    mock.onPost('https://api.klotty.com/email', payload).replyOnce(200, {
      id: '1234',
      from: 'admin@klotty.com',
      to: 'bu@klotty.com',
      cc: ['foo@klotty.com', 'bar@klotty.com'],
      created_at: '123',
    });

    const data = await klotty.sendEmail(payload);
    expect(data).toMatchSnapshot();
  });
});
