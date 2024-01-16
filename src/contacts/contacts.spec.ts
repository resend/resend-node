import { enableFetchMocks } from 'jest-fetch-mock';
import { Resend } from '../resend';
import { ErrorResponse } from '../interfaces';
import {
  GetContactOptions,
  GetContactResponseSuccess,
} from './interfaces/get-contact.interface';
import {
  CreateContactOptions,
  CreateContactResponseSuccess,
} from './interfaces/create-contact-options.interface';
import {
  ListContactsOptions,
  ListContactsResponseSuccess,
} from './interfaces/list-contacts.interface';
import { UpdateContactOptions } from './interfaces/update-contact.interface';
import {
  RemoveContactOptions,
  RemoveContactsResponseSuccess,
} from './interfaces/remove-contact.interface';

enableFetchMocks();

describe('Contacts', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('create', () => {
    it('creates a contact', async () => {
      const response: CreateContactResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
        name: 'Resend',
        created_at: '2023-04-07T22:48:33.420498+00:00',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });
      const payload: CreateContactOptions = {
        email: 'team@resend.com',
        audienceId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
      };

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(resend.contacts.create(payload)).resolves
        .toMatchInlineSnapshot(`
{
  "data": {
    "created_at": "2023-04-07T22:48:33.420498+00:00",
    "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222",
    "name": "Resend",
  },
  "error": null,
}
`);
    });

    it('throws error when missing name', async () => {
      const response: ErrorResponse = {
        name: 'missing_required_field',
        message: 'Missing `email` field.',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 422,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });
      const payload: CreateContactOptions = {
        email: '',
        audienceId: '',
      };

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.contacts.create(payload);

      await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing \`email\` field.",
    "name": "missing_required_field",
  },
}
`);
    });
  });

  describe('list', () => {
    it('lists contacts', async () => {
      const response: ListContactsResponseSuccess = [
        {
          id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
          name: 'resend.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
        },
        {
          id: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
          name: 'react.email',
          created_at: '2023-04-07T23:13:20.417116+00:00',
        },
      ];
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const options: ListContactsOptions = {
        audienceId: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381a',
      };
      await expect(resend.contacts.list(options)).resolves
        .toMatchInlineSnapshot(`
{
  "data": [
    {
      "created_at": "2023-04-07T23:13:52.669661+00:00",
      "id": "b6d24b8e-af0b-4c3c-be0c-359bbd97381e",
      "name": "resend.com",
    },
    {
      "created_at": "2023-04-07T23:13:20.417116+00:00",
      "id": "ac7503ac-e027-4aea-94b3-b0acd46f65f9",
      "name": "react.email",
    },
  ],
  "error": null,
}
`);
    });
  });

  describe('get', () => {
    describe('when contact not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Contact not found',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
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
}
`);
      });
    });

    it('get contact', async () => {
      const response: GetContactResponseSuccess = {
        object: 'contact',
        id: 'fd61172c-cafc-40f5-b049-b45947779a29',
        name: 'resend.com',
        created_at: '2023-06-21T06:10:36.144Z',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const options: GetContactOptions = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        audienceId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
      };
      await expect(resend.contacts.get(options)).resolves
        .toMatchInlineSnapshot(`
{
  "data": {
    "created_at": "2023-06-21T06:10:36.144Z",
    "id": "fd61172c-cafc-40f5-b049-b45947779a29",
    "name": "resend.com",
    "object": "contact",
  },
  "error": null,
}
`);
    });
  });

  describe('update', () => {
    it('updates a contact', async () => {
      const response = {
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

      const payload: UpdateContactOptions = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        audienceId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
        fistName: 'Bu',
      };
      await expect(resend.contacts.update(payload)).resolves
        .toMatchInlineSnapshot(`
{
  "data": {
    "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
  },
  "error": null,
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
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      const options: RemoveContactOptions = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        audienceId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
      };
      await expect(resend.contacts.remove(options)).resolves
        .toMatchInlineSnapshot(`
{
  "data": {
    "contact": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
    "deleted": true,
    "object": "contact",
  },
  "error": null,
}
`);
    });
  });

  it('removes a contact by email', async () => {
    const response: RemoveContactsResponseSuccess = {
      contact: 'acme@example.com',
      object: 'contact',
      deleted: true,
    };
    fetchMock.mockOnce(JSON.stringify(response), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer re_924b3rjh2387fbewf823',
      },
    });

    const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
    const options: RemoveContactOptions = {
      email: 'acme@example.com',
      audienceId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87222',
    };
    await expect(resend.contacts.remove(options)).resolves
      .toMatchInlineSnapshot(`
{
  "data": {
    "contact": "acme@example.com",
    "deleted": true,
    "object": "contact",
  },
  "error": null,
}
`);
  });
});
