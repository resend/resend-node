import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type { CreateInboxResponseSuccess } from './interfaces/create-inbox.interface';
import type { GetInboxResponseSuccess } from './interfaces/get-inbox.interface';
import type { ListInboxesResponseSuccess } from './interfaces/list-inboxes.interface';
import type { RemoveInboxResponseSuccess } from './interfaces/remove-inbox.interface';
import type { UpdateInboxResponseSuccess } from './interfaces/update-inbox.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

describe('Inboxes', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('create', () => {
    it('creates an inbox', async () => {
      const response: CreateInboxResponseSuccess = {
        object: 'inbox',
        id: '430eed87-632a-4ea6-90db-0aace67ec228',
        name: 'support',
        email_address: 'support@example.com',
        domain_id: 'd91cd9bd-1176-453e-8fc1-8880d0486fdc',
        forwarding_address: null,
        friendly_name: 'Support',
        unread: 0,
        created_at: '2026-09-01T00:00:00.000Z',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 201,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.create({
        emailAddress: 'support@example.com',
        name: 'support',
        friendlyName: 'Support',
      });

      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "created_at": "2026-09-01T00:00:00.000Z",
            "domain_id": "d91cd9bd-1176-453e-8fc1-8880d0486fdc",
            "email_address": "support@example.com",
            "forwarding_address": null,
            "friendly_name": "Support",
            "id": "430eed87-632a-4ea6-90db-0aace67ec228",
            "name": "support",
            "object": "inbox",
            "unread": 0,
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/inboxes',
        expect.objectContaining({
          method: 'POST',
          headers: expect.any(Headers),
          body: JSON.stringify({
            email_address: 'support@example.com',
            name: 'support',
            friendly_name: 'Support',
          }),
        }),
      );
    });

    it('returns a validation error', async () => {
      const response: ErrorResponse = {
        name: 'missing_required_field',
        statusCode: 422,
        message: 'Missing `email_address` field.',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 422,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.create({
        emailAddress: '',
      });

      expect(data).toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "Missing \`email_address\` field.",
            "name": "missing_required_field",
            "statusCode": 422,
          },
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });
  });

  describe('list', () => {
    const response: ListInboxesResponseSuccess = {
      object: 'list',
      has_more: false,
      data: [
        {
          id: '430eed87-632a-4ea6-90db-0aace67ec228',
          name: 'support',
          email_address: 'support@example.com',
          friendly_name: 'Support',
          unread: 2,
          last_received: '2026-09-01T00:00:00.000Z',
        },
      ],
    };

    it('lists inboxes', async () => {
      mockSuccessResponse(response, {
        headers: {},
      });

      const data = await resend.inboxes.list();

      expect(data).toEqual({
        data: response,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/inboxes',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });

    it('lists inboxes with pagination', async () => {
      mockSuccessResponse(response, {
        headers: {},
      });

      await resend.inboxes.list({
        limit: 10,
        after: '430eed87-632a-4ea6-90db-0aace67ec228',
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/inboxes?limit=10&after=430eed87-632a-4ea6-90db-0aace67ec228',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });
  });

  describe('get', () => {
    it('gets an inbox', async () => {
      const response: GetInboxResponseSuccess = {
        object: 'inbox',
        id: '430eed87-632a-4ea6-90db-0aace67ec228',
        name: 'support',
        email_address: 'support@example.com',
        forwarding_address: null,
        friendly_name: 'Support',
        unread: 2,
        drafts: 1,
        last_received: '2026-09-01T00:00:00.000Z',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.get(
        '430eed87-632a-4ea6-90db-0aace67ec228',
      );

      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "drafts": 1,
            "email_address": "support@example.com",
            "forwarding_address": null,
            "friendly_name": "Support",
            "id": "430eed87-632a-4ea6-90db-0aace67ec228",
            "last_received": "2026-09-01T00:00:00.000Z",
            "name": "support",
            "object": "inbox",
            "unread": 2,
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });

    it('returns an error when the inbox is not found', async () => {
      const response: ErrorResponse = {
        name: 'not_found',
        message: 'Inbox not found.',
        statusCode: 404,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 404,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.get('1234');

      expect(data).toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "Inbox not found.",
            "name": "not_found",
            "statusCode": 404,
          },
          "headers": {
            "content-type": "application/json",
          },
        }
      `);
    });
  });

  describe('update', () => {
    it('updates an inbox', async () => {
      const response: UpdateInboxResponseSuccess = {
        object: 'inbox',
        id: '430eed87-632a-4ea6-90db-0aace67ec228',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.update(
        '430eed87-632a-4ea6-90db-0aace67ec228',
        { name: 'billing' },
      );

      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "id": "430eed87-632a-4ea6-90db-0aace67ec228",
            "object": "inbox",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/inboxes/430eed87-632a-4ea6-90db-0aace67ec228',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ name: 'billing' }),
        }),
      );
    });

    it('maps friendlyName to friendly_name', async () => {
      mockSuccessResponse(
        {
          object: 'inbox',
          id: '430eed87-632a-4ea6-90db-0aace67ec228',
        },
        { headers: {} },
      );

      await resend.inboxes.update('430eed87-632a-4ea6-90db-0aace67ec228', {
        friendlyName: 'Billing',
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/inboxes/430eed87-632a-4ea6-90db-0aace67ec228',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ friendly_name: 'Billing' }),
        }),
      );
    });
  });

  describe('remove', () => {
    it('removes an inbox', async () => {
      const response: RemoveInboxResponseSuccess = {
        object: 'inbox',
        id: '430eed87-632a-4ea6-90db-0aace67ec228',
        deleted: true,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.remove(
        '430eed87-632a-4ea6-90db-0aace67ec228',
      );

      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "deleted": true,
            "id": "430eed87-632a-4ea6-90db-0aace67ec228",
            "object": "inbox",
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
