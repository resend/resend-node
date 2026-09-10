import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../../interfaces';
import { Resend } from '../../resend';
import { mockSuccessResponse } from '../../test-utils/mock-fetch';
import type { GetInboxThreadResponseSuccess } from './interfaces/get-inbox-thread.interface';
import type { ListInboxThreadsResponseSuccess } from './interfaces/list-inbox-threads.interface';
import type { RemoveInboxThreadResponseSuccess } from './interfaces/remove-inbox-thread.interface';
import type { InboxMessage } from './interfaces/thread';
import type { UpdateInboxThreadResponseSuccess } from './interfaces/update-inbox-thread.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

const inboxId = '430eed87-632a-4ea6-90db-0aace67ec228';
const threadId = 'b2c3d4e5-0000-4000-8000-000000000000';

const message: InboxMessage = {
  id: 'c3d4e5f6-0000-4000-8000-000000000000',
  direction: 'inbound',
  from: 'Ada Lovelace <ada@example.com>',
  to: ['support@example.com'],
  cc: [],
  bcc: [],
  reply_to: ['replies@example.com'],
  subject: 'Billing question',
  message_id: '<billing@example.com>',
  html: null,
  text: 'Please send the invoice.',
  attachments: [],
  read: true,
  received_at: '2026-09-01T00:00:00.000Z',
};

describe('Inbox threads', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('list', () => {
    const response: ListInboxThreadsResponseSuccess = {
      object: 'list',
      has_more: true,
      next_cursor: 'cursor_abc',
      data: [
        {
          id: threadId,
          subject: 'Billing question',
          from: 'ada@example.com',
          to: ['support@example.com'],
          cc: [],
          bcc: [],
          labels: [{ id: 'label-1', name: 'Urgent', color: 'grass' }],
          message_count: 2,
          has_attachment: false,
          has_draft: false,
          read: false,
          received_at: '2026-09-01T00:00:00.000Z',
        },
      ],
    };

    it('lists threads', async () => {
      mockSuccessResponse(response, { headers: {} });

      const data = await resend.inboxes.threads.list({ inboxId });

      expect(data).toEqual({
        data: response,
        error: null,
        headers: {
          'content-type': 'application/json',
        },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads`,
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });

    it('propagates cursor and label filters', async () => {
      mockSuccessResponse(response, { headers: {} });

      await resend.inboxes.threads.list({
        inboxId,
        folder: 'inbox',
        query: 'invoice',
        from: 'ada@example.com',
        label: ['label-1', 'label-2'],
        cursor: 'cursor_abc',
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads?folder=inbox&query=invoice&from=ada%40example.com&cursor=cursor_abc&label=label-1&label=label-2`,
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });

    it('returns a validation error', async () => {
      const error: ErrorResponse = {
        name: 'validation_error',
        statusCode: 422,
        message: 'The `cursor` is invalid.',
      };

      fetchMock.mockOnce(JSON.stringify(error), {
        status: 422,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.threads.list({
        inboxId,
        cursor: 'bad',
      });

      expect(data.error).toEqual(error);
      expect(data.data).toBeNull();
    });
  });

  describe('get', () => {
    it('gets a thread', async () => {
      const response: GetInboxThreadResponseSuccess = {
        object: 'inbox_thread',
        id: threadId,
        subject: 'Billing question',
        folder: 'inbox',
        labels: [],
        read: true,
        messages: {
          has_more: false,
          data: [message],
        },
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.threads.get({ inboxId, threadId });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads/${threadId}`,
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });
  });

  describe('update', () => {
    it('updates a thread', async () => {
      const response: UpdateInboxThreadResponseSuccess = {
        object: 'inbox',
        id: threadId,
        subject: 'Billing question',
        folder: 'archive',
        labels: [],
        read: true,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.threads.update({
        inboxId,
        threadId,
        read: true,
        folder: 'archive',
      });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads/${threadId}`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ read: true, folder: 'archive' }),
        }),
      );
    });

    it('maps labelId to label_id', async () => {
      mockSuccessResponse(
        {
          object: 'inbox',
          id: threadId,
          subject: 'Billing question',
          folder: 'inbox',
          labels: [],
          read: true,
        },
        { headers: {} },
      );

      await resend.inboxes.threads.update({
        inboxId,
        threadId,
        labelId: 'a1b2c3d4-0000-4000-8000-000000000000',
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads/${threadId}`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({
            label_id: 'a1b2c3d4-0000-4000-8000-000000000000',
          }),
        }),
      );
    });
  });

  describe('remove', () => {
    it('removes a thread', async () => {
      const response: RemoveInboxThreadResponseSuccess = {
        object: 'inbox_thread',
        id: threadId,
        deleted: true,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.threads.remove({ inboxId, threadId });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads/${threadId}`,
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
    });
  });
});
