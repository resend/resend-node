import createFetchMock from 'vitest-fetch-mock';
import { Resend } from '../../resend';
import { mockSuccessResponse } from '../../test-utils/mock-fetch';
import type {
  AddContactSegmentOptions,
  AddContactSegmentResponseSuccess,
} from './interfaces/add-contact-segment.interface';
import type {
  ListContactSegmentsOptions,
  ListContactSegmentsResponseSuccess,
} from './interfaces/list-contact-segments.interface';
import type {
  RemoveContactSegmentOptions,
  RemoveContactSegmentResponseSuccess,
} from './interfaces/remove-contact-segment.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('ContactSegments', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());
  describe('list', () => {
    it('gets contact segments by email', async () => {
      const options: ListContactSegmentsOptions = {
        email: 'carolina@resend.com',
      };
      const response: ListContactSegmentsResponseSuccess = {
        object: 'list',
        data: [
          {
            id: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
            name: 'Test Segment',
            created_at: '2021-01-01T00:00:00.000Z',
          },
          {
            id: 'd7e1e488-ae2c-4255-a40c-a4db3af7ed0c',
            name: 'Another Segment',
            created_at: '2021-01-02T00:00:00.000Z',
          },
        ],
        has_more: false,
      };

      mockSuccessResponse(response, {});

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.segments.list(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "data": [
              {
                "created_at": "2021-01-01T00:00:00.000Z",
                "id": "c7e1e488-ae2c-4255-a40c-a4db3af7ed0b",
                "name": "Test Segment",
              },
              {
                "created_at": "2021-01-02T00:00:00.000Z",
                "id": "d7e1e488-ae2c-4255-a40c-a4db3af7ed0c",
                "name": "Another Segment",
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

    it('gets contact segments by ID', async () => {
      const options: ListContactSegmentsOptions = {
        contactId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        limit: 1,
        after: '584a472d-bc6d-4dd2-aa9d-d3d50ce87222',
      };
      const response: ListContactSegmentsResponseSuccess = {
        object: 'list',
        data: [
          {
            id: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
            name: 'Test Segment',
            created_at: '2021-01-01T00:00:00.000Z',
          },
        ],
        has_more: true,
      };

      mockSuccessResponse(response, {});

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.segments.list(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "data": [
              {
                "created_at": "2021-01-01T00:00:00.000Z",
                "id": "c7e1e488-ae2c-4255-a40c-a4db3af7ed0b",
                "name": "Test Segment",
              },
            ],
            "has_more": true,
            "object": "list",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error when missing both id and email', async () => {
      const options = {};
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.contacts.segments.list(
        options as ListContactSegmentsOptions,
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

  describe('add', () => {
    it('adds a contact to an audience', async () => {
      const options: AddContactSegmentOptions = {
        email: 'carolina@resend.com',
        segmentId: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
      };

      const response: AddContactSegmentResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
      };

      mockSuccessResponse(response, {});

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.segments.add(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('adds a contact to an audience by ID', async () => {
      const options: AddContactSegmentOptions = {
        contactId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        segmentId: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
      };

      const response: AddContactSegmentResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
      };

      mockSuccessResponse(response, {});

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.segments.add(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error when missing both id and email', async () => {
      const options = {};
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.contacts.segments.add(
        options as AddContactSegmentOptions,
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

  describe('remove', () => {
    it('removes a contact from an audience', async () => {
      const options: RemoveContactSegmentOptions = {
        email: 'carolina@resend.com',
        segmentId: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
      };

      const response: RemoveContactSegmentResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        deleted: true,
      };

      mockSuccessResponse(response, {});

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.segments.remove(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "deleted": true,
            "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('removes a contact from an audience by ID', async () => {
      const options: RemoveContactSegmentOptions = {
        contactId: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        segmentId: 'c7e1e488-ae2c-4255-a40c-a4db3af7ed0b',
      };

      const response: RemoveContactSegmentResponseSuccess = {
        id: '3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223',
        deleted: true,
      };

      mockSuccessResponse(response, {});

      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');
      await expect(
        resend.contacts.segments.remove(options),
      ).resolves.toMatchInlineSnapshot(`
        {
          "data": {
            "deleted": true,
            "id": "3d4a472d-bc6d-4dd2-aa9d-d3d50ce87223",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns error when missing both id and email', async () => {
      const options = {};
      const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

      const result = resend.contacts.segments.remove(
        options as RemoveContactSegmentOptions,
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
