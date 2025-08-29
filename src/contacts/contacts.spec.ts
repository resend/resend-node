import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import {
  mockErrorResponse,
  mockSuccessResponse,
} from '../test-utils/mock-fetch';
import type {
  CreateContactOptions,
  CreateContactResponseSuccess,
} from './interfaces/create-contact-options.interface';
import type {
  GetContactOptions,
  GetContactResponseSuccess,
} from './interfaces/get-contact.interface';
import type {
  ListAudienceContactsOptions,
  ListAudienceContactsResponseSuccess,
  ListContactsApiResponseSuccess,
  ListContactsOptions,
} from './interfaces/list-contacts.interface';
import type {
  RemoveContactOptions,
  RemoveContactsResponseSuccess,
} from './interfaces/remove-contact.interface';
import type { UpdateContactOptions } from './interfaces/update-contact.interface';

describe('Contacts', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('create', () => {
    it('creates a contact', async () => {
      const payload: CreateContactOptions = {
        email: 'team@resend.com',
        audienceId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
      };
      const response: CreateContactResponseSuccess = {
        object: 'contact',
        id: '3deaccfb-f47f-440a-8875-ea14b1716b43',
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.create(payload),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "id": "3deaccfb-f47f-440a-8875-ea14b1716b43",
    "object": "contact",
  },
  "error": null,
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
    });

    it('throws error when missing name', async () => {
      const payload: CreateContactOptions = {
        email: '',
        audienceId: '',
      };
      const response: ErrorResponse = {
        name: 'missing_required_field',
        message: 'Missing `email` field.',
      };

      mockErrorResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.contacts.create(payload);

      await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing \`email\` field.",
    "name": "missing_required_field",
  },
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
    });
  });

  describe('list', () => {
    describe('when audienceId is not provided', () => {
      it('lists contacts', async () => {
        const options: ListContactsOptions = {
          limit: 10,
          after: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
        };

        const response: ListContactsApiResponseSuccess = {
          object: 'list',
          data: [
            {
              id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
              email: 'team@resend.com',
              created_at: '2023-04-07T23:13:52.669661+00:00',
              unsubscribed: false,
              first_name: 'John',
              last_name: 'Smith',
            },
            {
              id: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
              email: 'team@react.email',
              created_at: '2023-04-07T23:13:20.417116+00:00',
              unsubscribed: false,
              first_name: 'John',
              last_name: 'Smith',
            },
          ],
          has_more: false,
        };

        mockSuccessResponse(response, {
          headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(
          resend.contacts.list(options),
        ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "data": [
      {
        "created_at": "2023-04-07T23:13:52.669661+00:00",
        "email": "team@resend.com",
        "first_name": "John",
        "id": "b6d24b8e-af0b-4c3c-be0c-359bbd97381e",
        "last_name": "Smith",
        "unsubscribed": false,
      },
      {
        "created_at": "2023-04-07T23:13:20.417116+00:00",
        "email": "team@react.email",
        "first_name": "John",
        "id": "ac7503ac-e027-4aea-94b3-b0acd46f65f9",
        "last_name": "Smith",
        "unsubscribed": false,
      },
    ],
    "hasMore": false,
    "object": "list",
  },
  "error": null,
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
      });
    });
    describe('when audienceId is provided', () => {
      it('lists contacts', async () => {
        const options: ListAudienceContactsOptions = {
          audienceId: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381a',
        };
        const response: ListAudienceContactsResponseSuccess = {
          object: 'list',
          data: [
            {
              id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
              email: 'team@resend.com',
              created_at: '2023-04-07T23:13:52.669661+00:00',
              unsubscribed: false,
              first_name: 'John',
              last_name: 'Smith',
            },
            {
              id: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
              email: 'team@react.email',
              created_at: '2023-04-07T23:13:20.417116+00:00',
              unsubscribed: false,
              first_name: 'John',
              last_name: 'Smith',
            },
          ],
        };
        mockSuccessResponse(response, {
          headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        await expect(
          resend.contacts.list(options),
        ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "data": [
      {
        "created_at": "2023-04-07T23:13:52.669661+00:00",
        "email": "team@resend.com",
        "first_name": "John",
        "id": "b6d24b8e-af0b-4c3c-be0c-359bbd97381e",
        "last_name": "Smith",
        "unsubscribed": false,
      },
      {
        "created_at": "2023-04-07T23:13:20.417116+00:00",
        "email": "team@react.email",
        "first_name": "John",
        "id": "ac7503ac-e027-4aea-94b3-b0acd46f65f9",
        "last_name": "Smith",
        "unsubscribed": false,
      },
    ],
    "object": "list",
  },
  "error": null,
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
      });
    });
  });

  describe('get', () => {
    describe('when contact not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Contact not found',
        };

        mockErrorResponse(response, {
          headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const options: GetContactOptions = {
          id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
          audienceId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
        };
        const result = resend.contacts.get(options);

        await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Contact not found",
    "name": "not_found",
  },
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
      });
    });

    it('get contact by id', async () => {
      const response: GetContactResponseSuccess = {
        object: 'contact',
        id: 'fd61172c-cafc-40f5-b049-b45947779a29',
        email: 'team@resend.com',
        first_name: '',
        last_name: '',
        created_at: '2024-01-16T18:12:26.514Z',
        unsubscribed: false,
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const options: GetContactOptions = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        audienceId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
      };
      await expect(
        resend.contacts.get(options),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "created_at": "2024-01-16T18:12:26.514Z",
    "email": "team@resend.com",
    "first_name": "",
    "id": "fd61172c-cafc-40f5-b049-b45947779a29",
    "last_name": "",
    "object": "contact",
    "unsubscribed": false,
  },
  "error": null,
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
    });

    it('get contact by email', async () => {
      const response: GetContactResponseSuccess = {
        object: 'contact',
        id: 'fd61172c-cafc-40f5-b049-b45947779a29',
        email: 'team@resend.com',
        first_name: '',
        last_name: '',
        created_at: '2024-01-16T18:12:26.514Z',
        unsubscribed: false,
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const options: GetContactOptions = {
        email: 'team@resend.com',
        audienceId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
      };
      await expect(
        resend.contacts.get(options),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "created_at": "2024-01-16T18:12:26.514Z",
    "email": "team@resend.com",
    "first_name": "",
    "id": "fd61172c-cafc-40f5-b049-b45947779a29",
    "last_name": "",
    "object": "contact",
    "unsubscribed": false,
  },
  "error": null,
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
    });
  });

  describe('update', () => {
    it('updates a contact', async () => {
      const payload: UpdateContactOptions = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        audienceId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
        firstName: 'Bu',
      };
      const response = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        object: 'contact',
      };
      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      await expect(
        resend.contacts.update(payload),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
    "object": "contact",
  },
  "error": null,
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
    });
  });

  describe('remove', () => {
    it('removes a contact by id', async () => {
      const response: RemoveContactsResponseSuccess = {
        contact: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        object: 'contact',
        deleted: true,
      };
      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const options: RemoveContactOptions = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        audienceId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
      };
      await expect(
        resend.contacts.remove(options),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "contact": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
    "deleted": true,
    "object": "contact",
  },
  "error": null,
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
    });

    it('removes a contact by email', async () => {
      const response: RemoveContactsResponseSuccess = {
        contact: 'acme@example.com',
        object: 'contact',
        deleted: true,
      };
      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const options: RemoveContactOptions = {
        email: 'acme@example.com',
        audienceId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
      };
      await expect(
        resend.contacts.remove(options),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "contact": "acme@example.com",
    "deleted": true,
    "object": "contact",
  },
  "error": null,
  "rateLimiting": {
    "limit": 2,
    "remainingRequests": 2,
    "shouldResetAfter": 1,
  },
}
`);
    });
  });
});
