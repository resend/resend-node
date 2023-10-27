import { enableFetchMocks } from 'jest-fetch-mock';
import { Resend } from '../resend';

enableFetchMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

describe('Batch', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('create', () => {
    it('sends multiple emails', async () => {
      const payload = [
        {
          from: 'bu@resend.com',
          to: 'zeno@resend.com',
          subject: 'Hello World',
          html: '<h1>Hello world</h1>',
        },
        {
          from: 'vitor@resend.com',
          to: 'zeno@resend.com',
          subject: 'Olá mundo',
          html: '<h1>olá mundo</h1>',
        },
        {
          from: 'bu@resend.com',
          to: 'vitor@resend.com',
          subject: 'Hi there',
          html: '<h1>Hi there</h1>',
        },
      ];

      fetchMock.mockOnce(
        JSON.stringify({
          data: [{ id: '1234' }, { id: '4567' }, { id: '4242' }],
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        },
      );

      const data = await resend.batch.create(payload);
      expect(data).toMatchObject({
        data: [{ id: '1234' }, { id: '4567' }, { id: '4242' }],
      });
    });
  });

  describe('send', () => {
    it('sends multiple emails', async () => {
      const payload = [
        {
          from: 'bu@resend.com',
          to: 'zeno@resend.com',
          subject: 'Hello World',
          html: '<h1>Hello world</h1>',
        },
        {
          from: 'vitor@resend.com',
          to: 'zeno@resend.com',
          subject: 'Olá mundo',
          html: '<h1>olá mundo</h1>',
        },
        {
          from: 'bu@resend.com',
          to: 'vitor@resend.com',
          subject: 'Hi there',
          html: '<h1>Hi there</h1>',
        },
      ];

      fetchMock.mockOnce(
        JSON.stringify({
          data: [{ id: '1234' }, { id: '4567' }, { id: '4242' }],
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        },
      );

      const data = await resend.batch.send(payload);
      expect(data).toMatchObject({
        data: [{ id: '1234' }, { id: '4567' }, { id: '4242' }],
      });
    });
  });
});
