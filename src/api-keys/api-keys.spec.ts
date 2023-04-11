import axios from 'axios';
import MockAdapater from 'axios-mock-adapter';
import { Resend } from '../resend';

const mock = new MockAdapater(axios);

describe('API Keys', () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  describe('create', () => {
    it('creates an api key', async () => {
      mock.onPost('/api-keys', { name: 'Test' }).replyOnce(201, {
        token: 're_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk',
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

    it('throws error when missing name', async () => {
      mock.onPost('/api-keys').replyOnce(422, {
        statusCode: 422,
        name: 'missing_required_field',
        message: 'Missing "name" field',
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.apiKeys.create({ name: '' })).rejects
        .toMatchInlineSnapshot(`
        {
          "message": "Missing "name" field",
          "name": "missing_required_field",
          "statusCode": 422,
        }
      `);
      expect(mock.history.post.length).toBe(1);
    });

    describe('with access', () => {
      it('creates api key with access `full_access`', async () => {
        mock
          .onPost('/api-keys', { name: 'Test', permission: 'full_access' })
          .replyOnce(201, {
            token: 're_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk',
          });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(
          resend.apiKeys.create({ name: 'Test', permission: 'full_access' }),
        ).resolves.toMatchInlineSnapshot(`
          {
            "token": "re_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk",
          }
        `);
        expect(mock.history.post.length).toBe(1);
      });

      it('creates api key with access `sending_access`', async () => {
        mock
          .onPost('/api-keys', {
            name: 'Test',
            permission: 'sending_access',
          })
          .replyOnce(201, {
            token: 're_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk',
          });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(
          resend.apiKeys.create({
            name: 'Test',
            permission: 'sending_access',
          }),
        ).resolves.toMatchInlineSnapshot(`
          {
            "token": "re_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk",
          }
        `);
        expect(mock.history.post.length).toBe(1);
      });

      it('throws error with wrong access', async () => {
        mock
          .onPost('/api-keys', { name: 'Test', permission: 'wrong_access' })
          .replyOnce(422, {
            statusCode: 422,
            name: 'invalid_access',
            message: 'Access must be "full_access" | "sending_access"',
          });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(
          resend.apiKeys.create({
            name: 'Test',
            permission: 'wrong_access' as 'sending_access' | 'full_access',
          }),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `"Access must be "full_access" | "sending_access""`,
        );
        expect(mock.history.post.length).toBe(1);
      });
    });

    describe('restricted by domain', () => {
      it('creates api key restricted by domain', async () => {
        mock
          .onPost('/api-keys', {
            name: 'Test',
            permission: 'sending_access',
            domain_id: '7dfcf219-9900-4169-86f3-801e6d9b935e',
          })
          .replyOnce(201, {
            token: 're_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk',
          });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(
          resend.apiKeys.create({
            name: 'Test',
            permission: 'sending_access',
            domain_id: '7dfcf219-9900-4169-86f3-801e6d9b935e',
          }),
        ).resolves.toMatchInlineSnapshot(`
          {
            "token": "re_PKr4RCko_Lhm9ost2YjNCctnPjbLw8Nqk",
          }
        `);
        expect(mock.history.post.length).toBe(1);
      });

      it('throws error with wrong access', async () => {
        mock
          .onPost('/api-keys', {
            name: 'Test',
            permission: 'sending_access',
            domain_id: '1234',
          })
          .replyOnce(500, {
            name: 'application_error',
            message: 'Something went wrong',
            statusCode: 500,
          });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(
          resend.apiKeys.create({
            name: 'Test',
            permission: 'sending_access',
            domain_id: '1234',
          }),
        ).rejects.toThrowErrorMatchingInlineSnapshot(`"Something went wrong"`);
        expect(mock.history.post.length).toBe(1);
      });
    });
  });

  describe('list', () => {
    it('lists api keys', async () => {
      mock.onGet('/api-keys').replyOnce(200, {
        data: [
          {
            id: '5262504e-8ed7-4fac-bd16-0d4be94bc9f2',
            name: 'My API Key 1',
            created_at: '2023-04-07T20:29:10.666968+00:00',
          },
          {
            id: '98c37b35-1473-4afe-a627-78e975a36fab',
            name: 'My API Key 2',
            created_at: '2023-04-06T23:09:49.093947+00:00',
          },
        ],
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.apiKeys.list()).resolves.toMatchInlineSnapshot(`
        [
          {
            "created_at": "2023-04-07T20:29:10.666968+00:00",
            "id": "5262504e-8ed7-4fac-bd16-0d4be94bc9f2",
            "name": "My API Key 1",
          },
          {
            "created_at": "2023-04-06T23:09:49.093947+00:00",
            "id": "98c37b35-1473-4afe-a627-78e975a36fab",
            "name": "My API Key 2",
          },
        ]
      `);
      expect(mock.history.get.length).toBe(1);
    });
  });

  describe('remove', () => {
    it('removes an api key', async () => {
      mock
        .onDelete('/api-keys/5262504e-8ed7-4fac-bd16-0d4be94bc9f2')
        .replyOnce(200);

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.apiKeys.remove('5262504e-8ed7-4fac-bd16-0d4be94bc9f2'),
      ).resolves.toMatchInlineSnapshot(`undefined`);
      expect(mock.history.delete.length).toBe(1);
    });

    it('throws error when missing id', async () => {
      mock.onDelete('/api-keys/').replyOnce(500, {
        name: 'application_error',
        message: 'Something went wrong',
        statusCode: 500,
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(resend.apiKeys.remove('')).rejects.toMatchInlineSnapshot(`
        {
          "message": "Something went wrong",
          "name": "application_error",
          "statusCode": 500,
        }
      `);
      expect(mock.history.delete.length).toBe(1);
    });

    it('throws error when wrong id', async () => {
      mock
        .onDelete('/api-keys/34bd250e-615a-400c-be11-5912572ee15b')
        .replyOnce(500, {
          name: 'not_found',
          message: 'API key not found',
          statusCode: 404,
        });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.apiKeys.remove('34bd250e-615a-400c-be11-5912572ee15b'),
      ).rejects.toMatchInlineSnapshot(`
        {
          "message": "API key not found",
          "name": "not_found",
          "statusCode": 404,
        }
      `);
      expect(mock.history.delete.length).toBe(1);
    });
  });
});
