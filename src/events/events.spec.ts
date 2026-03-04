import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import { mockSuccessResponse } from '../test-utils/mock-fetch';
import type { CreateEventResponseSuccess } from './interfaces/create-event.interface';
import type { GetEventResponseSuccess } from './interfaces/get-event.interface';
import type { ListEventsResponseSuccess } from './interfaces/list-events.interface';
import type { RemoveEventResponseSuccess } from './interfaces/remove-event.interface';
import type { SendEventResponseSuccess } from './interfaces/send-event.interface';
import type { UpdateEventResponseSuccess } from './interfaces/update-event.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

describe('Events', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('send', () => {
    it('sends an event with contactId', async () => {
      const response: SendEventResponseSuccess = {
        object: 'workflow_event',
        event: 'user.created',
        event_instance_id: 'evt-inst-123',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.events.send({
        event: 'user.created',
        contactId: 'contact-123',
        payload: { name: 'John' },
      });

      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "event": "user.created",
            "event_instance_id": "evt-inst-123",
            "object": "workflow_event",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/events/send',
        expect.objectContaining({
          method: 'POST',
          headers: expect.any(Headers),
          body: JSON.stringify({
            event: 'user.created',
            contact_id: 'contact-123',
            payload: { name: 'John' },
          }),
        }),
      );
    });

    it('sends an event with email', async () => {
      const response: SendEventResponseSuccess = {
        object: 'workflow_event',
        event: 'user.created',
        event_instance_id: 'evt-inst-456',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.events.send({
        event: 'user.created',
        email: 'john@example.com',
      });

      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "event": "user.created",
            "event_instance_id": "evt-inst-456",
            "object": "workflow_event",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/events/send',
        expect.objectContaining({
          method: 'POST',
          headers: expect.any(Headers),
          body: JSON.stringify({
            event: 'user.created',
            email: 'john@example.com',
          }),
        }),
      );
    });
  });

  describe('create', () => {
    it('creates an event', async () => {
      const response: CreateEventResponseSuccess = {
        object: 'event',
        id: 'evt-123',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.events.create({
        name: 'user.created',
        schema: { name: 'string', age: 'number' },
      });

      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "id": "evt-123",
            "object": "event",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/events',
        expect.objectContaining({
          method: 'POST',
          headers: expect.any(Headers),
          body: JSON.stringify({
            name: 'user.created',
            schema: { name: 'string', age: 'number' },
          }),
        }),
      );
    });

    it('returns error on failure', async () => {
      const response: ErrorResponse = {
        name: 'missing_required_field',
        statusCode: 422,
        message: 'Missing `name` field.',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 422,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.events.create({ name: '' });
      expect(data).toMatchInlineSnapshot(`
        {
          "data": null,
          "error": {
            "message": "Missing \`name\` field.",
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

  describe('get', () => {
    it('gets an event by id', async () => {
      const response: GetEventResponseSuccess = {
        object: 'event',
        id: 'evt-123',
        name: 'user.created',
        schema: { name: 'string' },
        created_at: '2025-01-01T00:00:00.000Z',
        updated_at: '2025-01-01T00:00:00.000Z',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.events.get('evt-123');
      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "created_at": "2025-01-01T00:00:00.000Z",
            "id": "evt-123",
            "name": "user.created",
            "object": "event",
            "schema": {
              "name": "string",
            },
            "updated_at": "2025-01-01T00:00:00.000Z",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/events/evt-123',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });

    it('gets an event by name', async () => {
      const response: GetEventResponseSuccess = {
        object: 'event',
        id: 'evt-123',
        name: 'user.created',
        schema: null,
        created_at: '2025-01-01T00:00:00.000Z',
        updated_at: '2025-01-01T00:00:00.000Z',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      await resend.events.get('user.created');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/events/user.created',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });
  });

  describe('list', () => {
    const response: ListEventsResponseSuccess = {
      object: 'list',
      has_more: false,
      data: [
        {
          id: 'evt-123',
          name: 'user.created',
          schema: null,
          created_at: '2025-01-01T00:00:00.000Z',
          updated_at: '2025-01-01T00:00:00.000Z',
        },
        {
          id: 'evt-456',
          name: 'user.updated',
          schema: null,
          created_at: '2025-02-01T00:00:00.000Z',
          updated_at: '2025-02-01T00:00:00.000Z',
        },
      ],
    };

    it('lists events without pagination', async () => {
      mockSuccessResponse(response, {
        headers: {},
      });

      const data = await resend.events.list();
      expect(data).toEqual({
        data: response,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/events',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });

    it('lists events with pagination', async () => {
      mockSuccessResponse(response, {
        headers: {},
      });

      const data = await resend.events.list({ limit: 10, after: 'cursor-abc' });
      expect(data).toEqual({
        data: response,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/events?limit=10&after=cursor-abc',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        }),
      );
    });
  });

  describe('update', () => {
    it('updates an event', async () => {
      const response: UpdateEventResponseSuccess = {
        object: 'event',
        id: 'evt-123',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.events.update('evt-123', {
        schema: { name: 'string', active: 'boolean' },
      });

      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "id": "evt-123",
            "object": "event",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/events/evt-123',
        expect.objectContaining({
          method: 'PATCH',
          headers: expect.any(Headers),
          body: JSON.stringify({
            schema: { name: 'string', active: 'boolean' },
          }),
        }),
      );
    });
  });

  describe('remove', () => {
    it('removes an event', async () => {
      const response: RemoveEventResponseSuccess = {
        object: 'event',
        id: 'evt-123',
        deleted: true,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.events.remove('evt-123');
      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "deleted": true,
            "id": "evt-123",
            "object": "event",
          },
          "error": null,
          "headers": {
            "content-type": "application/json",
          },
        }
      `);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.resend.com/events/evt-123',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.any(Headers),
        }),
      );
    });
  });
});
