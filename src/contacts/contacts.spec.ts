import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type {
  CreateContactOptions,
  CreateContactResponseSuccess,
} from './interfaces/create-contact-options.interface';
import type {
  GetContactOptions,
  GetContactResponseSuccess,
} from './interfaces/get-contact.interface';
import type {
  ListContactsOptions,
  ListContactsResponseSuccess,
} from './interfaces/list-contacts.interface';
import type {
  RemoveContactOptions,
  RemoveContactsResponseSuccess,
} from './interfaces/remove-contact.interface';
import type { UpdateContactOptions } from './interfaces/update-contact.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Contacts', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

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

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
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
          "headers": {
            "content-type": "application/json",
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

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 422,
        headers: {
          'content-type': 'application/json',
        },
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
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });
  });

  describe('list', () => {
    describe('without pagination', () => {
      it('lists contacts', async () => {
        const options: ListContactsOptions = {
          audienceId: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381a',
        };
        const response: ListContactsResponseSuccess = {
          object: 'list',
          has_more: false,
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
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

        const result = await resend.contacts.list(options);
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/audiences/b6d24b8e-af0b-4c3c-be0c-359bbd97381a/contacts',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });
      describe('when audienceId is not provided', () => {
        it('lists contacts', async () => {
          const options: ListContactsOptions = {
            limit: 10,
            after: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
          };

          const response: ListContactsResponseSuccess = {
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

          mockSuccessResponse(response, {});

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
                "has_more": false,
                "object": "list",
              },
              "error": null,
              "headers": {
                "content-type": "application/json",
              },
            }
          `);
        });
      });
    });

    describe('when pagination options are provided', () => {
      const response: ListContactsResponseSuccess = {
        object: 'list',
        has_more: true,
        data: [
          {
            id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
            email: 'team@resend.com',
            created_at: '2023-04-07T23:13:52.669661+00:00',
            unsubscribed: false,
            first_name: 'John',
            last_name: 'Smith',
          },
        ],
      };

      it('passes limit param and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.contacts.list({
          audienceId: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381a',
          limit: 1,
        });
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/audiences/b6d24b8e-af0b-4c3c-be0c-359bbd97381a/contacts?limit=1',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });

      it('passes limit and after params and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.contacts.list({
          audienceId: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381a',
          limit: 1,
          after: 'cursor-value',
        });
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/audiences/b6d24b8e-af0b-4c3c-be0c-359bbd97381a/contacts?limit=1&after=cursor-value',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });

      it('passes limit and before params and returns a response', async () => {
        mockSuccessResponse(response, {
          headers: {},
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const result = await resend.contacts.list({
          audienceId: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381a',
          limit: 1,
          before: 'cursor-value',
        });
        expect(result).toEqual({
          data: response,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/audiences/b6d24b8e-af0b-4c3c-be0c-359bbd97381a/contacts?limit=1&before=cursor-value',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
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

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
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
            "headers": {
              "content-type": "application/json",
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

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
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
          "headers": {
            "content-type": "application/json",
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

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
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
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    describe('when audienceId is not provided', () => {
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

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const options: GetContactOptions = {
          id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
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
            "headers": {
              "content-type": "application/json",
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

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        const options: GetContactOptions = {
          email: 'team@resend.com',
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
            "headers": {
              "content-type": "application/json",
            },
          }
        `);
      });
      it('get contact by string id', async () => {
        const response: GetContactResponseSuccess = {
          object: 'contact',
          id: 'fd61172c-cafc-40f5-b049-b45947779a29',
          email: 'team@resend.com',
          first_name: '',
          last_name: '',
          created_at: '2024-01-16T18:12:26.514Z',
          unsubscribed: false,
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        await expect(
          resend.contacts.get('fd61172c-cafc-40f5-b049-b45947779a29'),
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
            "headers": {
              "content-type": "application/json",
            },
          }
        `);

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/contacts/fd61172c-cafc-40f5-b049-b45947779a29',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });

      it('get contact by string email', async () => {
        const response: GetContactResponseSuccess = {
          object: 'contact',
          id: 'fd61172c-cafc-40f5-b049-b45947779a29',
          email: 'team@resend.com',
          first_name: '',
          last_name: '',
          created_at: '2024-01-16T18:12:26.514Z',
          unsubscribed: false,
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });

        const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
        await expect(
          resend.contacts.get('team@resend.com'),
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
            "headers": {
              "content-type": "application/json",
            },
          }
        `);

        expect(fetchMock).toHaveBeenCalledWith(
          'https://api.resend.com/contacts/team@resend.com',
          expect.objectContaining({
            method: 'GET',
            headers: expect.any(Headers),
          }),
        );
      });
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
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
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
          "headers": {
            "content-type": "application/json",
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
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
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
          "headers": {
            "content-type": "application/json",
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
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
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
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('removes a contact by string id', async () => {
      const response: RemoveContactsResponseSuccess = {
        contact: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        object: 'contact',
        deleted: true,
      };
      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.remove('3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223'),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "contact": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
            "deleted": true,
            "object": "contact",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });
  });
});
