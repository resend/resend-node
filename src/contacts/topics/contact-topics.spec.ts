import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../../resend';
import { mockSuccessResponse } from '../../test-utils/mock-fetch';
import type {
  ListContactTopicsOptions,
  ListContactTopicsResponseSuccess,
} from './interfaces/list-contact-topics.interface';
import type {
  UpdateContactTopicsOptions,
  UpdateContactTopicsResponseSuccess,
} from './interfaces/update-contact-topics.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('ContactTopics', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('update', () => {
    it('updates contact topics with opt_in', async () => {
      const payload: UpdateContactTopicsOptions = {
        email: 'carolina+2@resend.com',
        topics: [
          {
            id: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
            subscription: 'opt_in',
          },
        ],
      };
      const response: UpdateContactTopicsResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.topics.update(payload),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
          },
          "error": null,
          "headers": {
            "authorization": "Bearer re_924b3rjh2387fbewf823",
            "content-type": "application/json",
          },
        }
      `);
    });

    it('updates contact topics with opt_out', async () => {
      const payload: UpdateContactTopicsOptions = {
        email: 'carolina+2@resend.com',
        topics: [
          {
            id: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
            subscription: 'opt_out',
          },
        ],
      };
      const response: UpdateContactTopicsResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.topics.update(payload),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
          },
          "error": null,
          "headers": {
            "authorization": "Bearer re_924b3rjh2387fbewf823",
            "content-type": "application/json",
          },
        }
      `);
    });

    it('updates contact topics with both opt_in and opt_out', async () => {
      const payload: UpdateContactTopicsOptions = {
        email: 'carolina+2@resend.com',
        topics: [
          {
            id: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
            subscription: 'opt_in',
          },
          {
            id: 'another-topic-id',
            subscription: 'opt_out',
          },
        ],
      };
      const response: UpdateContactTopicsResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.topics.update(payload),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
          },
          "error": null,
          "headers": {
            "authorization": "Bearer re_924b3rjh2387fbewf823",
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error when missing both id and email', async () => {
      const payload = {
        topics: [
          {
            id: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
            subscription: 'opt_in',
          },
        ],
      };
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.contacts.topics.update(
        payload as UpdateContactTopicsOptions,
      );

      await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing \`id\` or \`email\` field.",
    "name": "missing_required_field",
    "statusCode": null,
  },
  "headers": null,
}
`);
    });

    it('updates contact topics using ID', async () => {
      const payload: UpdateContactTopicsOptions = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        topics: [
          {
            id: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
            subscription: 'opt_in',
          },
        ],
      };
      const response: UpdateContactTopicsResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.topics.update(payload),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
          },
          "error": null,
          "headers": {
            "authorization": "Bearer re_924b3rjh2387fbewf823",
            "content-type": "application/json",
          },
        }
      `);
    });
  });

  describe('list', () => {
    it('gets contact topics by email', async () => {
      const options: ListContactTopicsOptions = {
        email: 'carolina@resend.com',
      };
      const response: ListContactTopicsResponseSuccess = {
        has_more: false,
        object: 'list',
        data: [
          {
            id: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
            name: 'Test Topic',
            description: 'This is a test topic',
            subscription: 'opt_in',
          },
          {
            id: 'another-topic-id',
            name: 'Another Topic',
            description: null,
            subscription: 'opt_out',
          },
        ],
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.topics.list(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "data": [
              {
                "description": "This is a test topic",
                "id": "c7e1e488-ae2c-4255-a40c-a4db3af7ed0b",
                "name": "Test Topic",
                "subscription": "opt_in",
              },
              {
                "description": null,
                "id": "another-topic-id",
                "name": "Another Topic",
                "subscription": "opt_out",
              },
            ],
            "has_more": false,
            "object": "list",
          },
          "error": null,
          "headers": {
            "authorization": "Bearer re_924b3rjh2387fbewf823",
            "content-type": "application/json",
          },
        }
      `);
    });

    it('gets contact topics by ID', async () => {
      const options: ListContactTopicsOptions = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
      };
      const response: ListContactTopicsResponseSuccess = {
        has_more: false,
        object: 'list',
        data: [
          {
            id: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
            name: 'Test Topic',
            description: 'This is a test topic',
            subscription: 'opt_in',
          },
        ],
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.topics.list(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "data": [
              {
                "description": "This is a test topic",
                "id": "c7e1e488-ae2c-4255-a40c-a4db3af7ed0b",
                "name": "Test Topic",
                "subscription": "opt_in",
              },
            ],
            "has_more": false,
            "object": "list",
          },
          "error": null,
          "headers": {
            "authorization": "Bearer re_924b3rjh2387fbewf823",
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error when missing both id and email', async () => {
      const options = {};
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.contacts.topics.list(
        options as ListContactTopicsOptions,
      );

      await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing \`id\` or \`email\` field.",
    "name": "missing_required_field",
    "statusCode": null,
  },
  "headers": null,
}
`);
    });
  });
});
