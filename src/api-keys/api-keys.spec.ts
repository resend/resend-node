import axios from 'axios';
import MockAdapater from 'axios-mock-adapter';
import { Resend } from '../resend';

const mock = new MockAdapater(axios);

describe('API Keys', () => {
  describe('create', () => {
    it('creates an api key', async () => {
      mock.onPost('/api-keys', { name: 'Test' }).replyOnce(201, {
        data: 're_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk',
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.apiKeys.create({ name: 'Test' })).resolves
        .toMatchInlineSnapshot(`
        {
          "token": "re_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk",
        }
      `);
      expect(mock.history.post.length).toBe(1);
    });
  });
});
