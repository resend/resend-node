import axios from 'axios';
import MockAdapater from 'axios-mock-adapter';
import { Resend } from '../resend';

const mock = new MockAdapater(axios);

describe('API Keys', () => {
  describe('create', () => {
    it('creates an api key', async () => {
      mock
        .onPost('/api-keys', {
          name: 'Test',
        })
        .replyOnce(201);

      const resend = new Resend('31387s51-8ce1-42f2-a3e3-cxf6327f3cb9');

      await expect(
        resend.apiKeys.create({ name: 'Test' }),
      ).resolves.toBeUndefined();
      expect(mock.history.post.length).toBe(1);
    });
  });
});
