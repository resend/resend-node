import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import {
  mockErrorResponse,
  mockSuccessResponse,
} from '../test-utils/mock-fetch';
import type {
  CreateContactPropertyOptions,
  CreateContactPropertyResponseSuccess,
} from './interfaces/create-contact-property-options.interface';
import type { RemoveContactPropertyResponseSuccess } from './interfaces/delete-contact-property-options.interface';
import type { GetContactPropertyResponseSuccess } from './interfaces/get-contact-property.interface';
import type { ListContactPropertiesResponseSuccess } from './interfaces/list-contact-properties-options.interface';
import type {
  UpdateContactPropertyOptions,
  UpdateContactPropertyResponseSuccess,
} from './interfaces/update-contact-property-options.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('ContactProperties', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('create', () => {
    it('creates a contact property', async () => {
      const payload: CreateContactPropertyOptions = {
        key: 'country',
        type: 'string',
        fallbackValue: 'unknown',
      };
      const response: CreateContactPropertyResponseSuccess = {
        object: 'contact_property',
        id: '3deaccfb-f47f-440a-8875-ea14b1716b43',
      };

      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contactProperties.create(payload),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "3deaccfb-f47f-440a-8875-ea14b1716b43",
            "object": "contact_property",
          },
          "error": null,
          "headers": {
            "authorization": "Bearer re_924b3rjh2387fbewf823",
            "content-type": "application/json",
          },
        }
      `);
    });

    it('throws error when missing key', async () => {
      // @ts-expect-error - Testing invalid input
      const payload: CreateContactPropertyOptions = {
        type: 'string',
        fallbackValue: 'unknown',
      };
      const response: ErrorResponse = {
        statusCode: 422,
        name: 'missing_required_field',
        message: 'Missing `key` field.',
      };

      mockErrorResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contactProperties.create(payload),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "Missing \`key\` field.",
            "name": "missing_required_field",
            "statusCode": 422,
          },
          "headers": {
            "authorization": "Bearer re_924b3rjh2387fbewf823",
            "content-type": "application/json",
          },
        }
      `);
    });
  });

  describe('list', () => {
    it('lists contact properties', async () => {
      const response: ListContactPropertiesResponseSuccess = {
        data: [
          {
            id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
            key: 'country',
            type: 'string',
            fallback_value: 'unknown',
            object: 'contact_property',
            created_at: '2021-01-01T00:00:00.000Z',
          },
          {
            id: 'ac7503ac-e027-4aea-94b3-b0acd46f65f9',
            key: 'edition',
            type: 'number',
            fallback_value: 1,
            object: 'contact_property',
            created_at: '2021-01-01T00:00:00.000Z',
          },
        ],
        object: 'list',
        has_more: false,
      };
      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contactProperties.list(),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "data": [
      {
        "createdAt": "2021-01-01T00:00:00.000Z",
        "fallbackValue": "unknown",
        "id": "b6d24b8e-af0b-4c3c-be0c-359bbd97381e",
        "key": "country",
        "object": "contact_property",
        "type": "string",
      },
      {
        "createdAt": "2021-01-01T00:00:00.000Z",
        "fallbackValue": 1,
        "id": "ac7503ac-e027-4aea-94b3-b0acd46f65f9",
        "key": "edition",
        "object": "contact_property",
        "type": "number",
      },
    ],
    "has_more": false,
    "object": "list",
  },
  "error": null,
}
`);
    });
  });

  describe('get', () => {
    it('gets a contact property by id', async () => {
      const response: GetContactPropertyResponseSuccess = {
        id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
        key: 'country',
        type: 'string',
        fallback_value: 'unknown',
        object: 'contact_property',
        created_at: '2021-01-01T00:00:00.000Z',
      };
      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contactProperties.get('b6d24b8e-af0b-4c3c-be0c-359bbd97381e'),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "createdAt": "2021-01-01T00:00:00.000Z",
    "fallbackValue": "unknown",
    "id": "b6d24b8e-af0b-4c3c-be0c-359bbd97381e",
    "key": "country",
    "object": "contact_property",
    "type": "string",
  },
  "error": null,
}
`);
    });

    it('returns error when missing id', async () => {
      const response: ErrorResponse = {
        statusCode: null,
        name: 'missing_required_field',
        message: 'Missing `id` field.',
      };
      mockErrorResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contactProperties.get(''),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing \`id\` field.",
    "name": "missing_required_field",
    "statusCode": null,
  },
}
`);
    });

    it('returns error when contact property not found', async () => {
      const response: ErrorResponse = {
        statusCode: 404,
        name: 'not_found',
        message: 'Contact property not found',
      };
      mockErrorResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contactProperties.get('b6d24b8e-af0b-4c3c-be0c-359bbd97381e'),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "Contact property not found",
            "name": "not_found",
            "statusCode": 404,
          },
          "headers": {
            "authorization": "Bearer re_924b3rjh2387fbewf823",
            "content-type": "application/json",
          },
        }
      `);
    });
  });

  describe('update', () => {
    it('updates a contact property', async () => {
      const payload: UpdateContactPropertyOptions = {
        id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
        fallbackValue: 'new value',
      };
      const response: UpdateContactPropertyResponseSuccess = {
        id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
        object: 'contact_property',
      };
      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contactProperties.update(payload),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "b6d24b8e-af0b-4c3c-be0c-359bbd97381e",
            "object": "contact_property",
          },
          "error": null,
          "headers": {
            "authorization": "Bearer re_924b3rjh2387fbewf823",
            "content-type": "application/json",
          },
        }
      `);
    });
    it('returns error when missing id', async () => {
      const payload: UpdateContactPropertyOptions = {
        id: '',
        fallbackValue: 'new value',
      };
      const response: ErrorResponse = {
        statusCode: null,
        name: 'missing_required_field',
        message: 'Missing `id` field.',
      };
      mockErrorResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contactProperties.update(payload),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing \`id\` field.",
    "name": "missing_required_field",
    "statusCode": null,
  },
}
`);
    });
  });

  describe('remove', () => {
    it('removes a contact property', async () => {
      const response: RemoveContactPropertyResponseSuccess = {
        deleted: true,
        id: 'b6d24b8e-af0b-4c3c-be0c-359bbd97381e',
        object: 'contact_property',
      };
      mockSuccessResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contactProperties.remove('b6d24b8e-af0b-4c3c-be0c-359bbd97381e'),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "deleted": true,
            "id": "b6d24b8e-af0b-4c3c-be0c-359bbd97381e",
            "object": "contact_property",
          },
          "error": null,
          "headers": {
            "authorization": "Bearer re_924b3rjh2387fbewf823",
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error when missing id', async () => {
      const response: ErrorResponse = {
        statusCode: null,
        name: 'missing_required_field',
        message: 'Missing `id` field.',
      };
      mockErrorResponse(response, {
        headers: { Authorization: 'Bearer re_924b3rjh2387fbewf823' },
      });
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contactProperties.remove(''),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Missing \`id\` field.",
    "name": "missing_required_field",
    "statusCode": null,
  },
}
`);
    });
  });
});
