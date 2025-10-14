import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../../resend';
import { mockSuccessResponse } from '../../test-utils/mock-fetch';
import type {
  AddContactAudiencesOptions,
  AddContactAudiencesResponseSuccess,
} from './interfaces/add-contact-audience.interface';
import type {
  ListContactAudiencesOptions,
  ListContactAudiencesResponseSuccess,
} from './interfaces/list-contact-audiences.interface';
import type {
  RemoveContactAudiencesOptions,
  RemoveContactAudiencesResponseSuccess,
} from './interfaces/remove-contact-audience.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('ContactAudiences', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());
  describe('list', () => {
    it('gets contact audiences by email', async () => {
      const options: ListContactAudiencesOptions = {
        email: 'carolina@resend.com',
      };
      const response: ListContactAudiencesResponseSuccess = {
        object: 'list',
        data: [
          {
            id: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
            name: 'Test Audience',
            created_at: '2021-01-01T00:00:00.000Z',
          },
          {
            id: 'd7e1e488-ae2c-4255-a40c-a4db3af7ed0c',
            name: 'Another Audience',
            created_at: '2021-01-02T00:00:00.000Z',
          },
        ],
        has_more: false,
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.audiences.list(options),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "data": [
      {
        "created_at": "2021-01-01T00:00:00.000Z",
        "id": "c7e1e488-ae2c-4255-a40c-a4db3af7ed0b",
        "name": "Test Audience",
      },
      {
        "created_at": "2021-01-02T00:00:00.000Z",
        "id": "d7e1e488-ae2c-4255-a40c-a4db3af7ed0c",
        "name": "Another Audience",
      },
    ],
    "has_more": false,
    "object": "list",
  },
  "error": null,
}
`);
    });

    it('gets contact audiences by ID', async () => {
      const options: ListContactAudiencesOptions = {
        contactId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        limit: 1,
        after: '584a472d-bc6d-4dd2-aa9d-d3d50ce87222',
      };
      const response: ListContactAudiencesResponseSuccess = {
        object: 'list',
        data: [
          {
            id: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
            name: 'Test Audience',
            created_at: '2021-01-01T00:00:00.000Z',
          },
        ],
        has_more: true,
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.audiences.list(options),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "data": [
      {
        "created_at": "2021-01-01T00:00:00.000Z",
        "id": "c7e1e488-ae2c-4255-a40c-a4db3af7ed0b",
        "name": "Test Audience",
      },
    ],
    "has_more": true,
    "object": "list",
  },
  "error": null,
}
`);
    });

    it('returns error when missing both id and email', async () => {
      const options = {};
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.contacts.audiences.list(
        options as ListContactAudiencesOptions,
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

  describe('add', () => {
    it('adds a contact to an audience', async () => {
      const options: AddContactAudiencesOptions = {
        email: 'carolina@resend.com',
        audienceId: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
      };

      const response: AddContactAudiencesResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.audiences.add(options),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
  },
  "error": null,
}
`);
    });

    it('adds a contact to an audience by ID', async () => {
      const options: AddContactAudiencesOptions = {
        contactId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        audienceId: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
      };

      const response: AddContactAudiencesResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.audiences.add(options),
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
      const options = {};
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.contacts.audiences.add(
        options as AddContactAudiencesOptions,
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

  describe('remove', () => {
    it('removes a contact from an audience', async () => {
      const options: RemoveContactAudiencesOptions = {
        email: 'carolina@resend.com',
        audienceId: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
      };

      const response: RemoveContactAudiencesResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        deleted: true,
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.audiences.remove(options),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "deleted": true,
    "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
  },
  "error": null,
}
`);
    });

    it('removes a contact from an audience by ID', async () => {
      const options: RemoveContactAudiencesOptions = {
        contactId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        audienceId: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
      };

      const response: RemoveContactAudiencesResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        deleted: true,
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.audiences.remove(options),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "deleted": true,
    "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
  },
  "error": null,
}
`);
    });

    it('returns error when missing both id and email', async () => {
      const options = {};
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.contacts.audiences.remove(
        options as RemoveContactAudiencesOptions,
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
