import { enableFetchMocks } from 'jest-fetch-mock';
import { Resend } from '../../resend';
import type {
  GetContactTopicsOptions,
  GetContactTopicsResponseSuccess,
} from './interfaces/get-contact-topics.interface';
import type {
  UpdateContactTopicsOptions,
  UpdateContactTopicsResponseSuccess,
} from './interfaces/update-contact-topics.interface';

enableFetchMocks();

describe('ContactTopics', () => {
  afterEach(() => fetchMock.resetMocks());

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

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
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

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
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

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
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
  },
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

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
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
}
`);
    });
  });

  describe('get', () => {
    it('gets contact topics by email', async () => {
      const options: GetContactTopicsOptions = {
        email: 'carolina@resend.com',
      };
      const response: GetContactTopicsResponseSuccess = {
        email: 'carolina@resend.com',
        topics: [
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

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.topics.get(options),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "email": "carolina@resend.com",
    "topics": [
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
  },
  "error": null,
}
`);
    });

    it('gets contact topics by ID', async () => {
      const options: GetContactTopicsOptions = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
      };
      const response: GetContactTopicsResponseSuccess = {
        email: 'carolina@resend.com',
        topics: [
          {
            id: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
            name: 'Test Topic',
            description: 'This is a test topic',
            subscription: 'opt_in',
          },
        ],
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.topics.get(options),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "email": "carolina@resend.com",
    "topics": [
      {
        "description": "This is a test topic",
        "id": "c7e1e488-ae2c-4255-a40c-a4db3af7ed0b",
        "name": "Test Topic",
        "subscription": "opt_in",
      },
    ],
  },
  "error": null,
}
`);
    });

    it('returns error when missing both id and email', async () => {
      const options = {};
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.contacts.topics.get(
        options as GetContactTopicsOptions,
      );

      await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing \`id\` or \`email\` field.",
    "name": "missing_required_field",
  },
}
`);
    });
  });
});
