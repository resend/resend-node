import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../../interfaces';
import { Resend } from '../../resend';
import { mockSuccessResponse } from '../../test-utils/mock-fetch';
import type { GetInboxThreadResponseSuccess } from './interfaces/get-inbox-thread.interface';
import type { ListInboxThreadsResponseSuccess } from './interfaces/list-inbox-threads.interface';
import type { RemoveInboxThreadResponseSuccess } from './interfaces/remove-inbox-thread.interface';
import type { SearchInboxThreadsResponseSuccess } from './interfaces/search-inbox-threads.interface';
import type { UpdateInboxThreadResponseSuccess } from './interfaces/update-inbox-thread.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

const inboxId = '430eed87-632a-4ea6-90db-0aace67ec228';
const threadId = 'b2c3d4e5-0000-4000-8000-000000000000';

describe('Inbox threads', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('list', () => {
    const response: ListInboxThreadsResponseSuccess = {
      object: 'list',
      has_more: true,
      data: [
        {
          id: threadId,
          subject: 'Billing question',
          from: 'ada@example.com',
          to: ['support@example.com'],
          cc: [],
          bcc: [],
          labels: [{ id: 'label-1', name: 'Urgent', color: '#46A758' }],
          message_count: 2,
          has_attachment: false,
          has_draft: false,
          read: false,
          received_at: '2026-09-01T00:00:00.000Z',
          folder: 'inbox',
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

    it('sends folders and labels comma-separated with read and pagination', async () => {
      mockSuccessResponse(response, { headers: {} });

      await resend.inboxes.threads.list({
        inboxId,
        folders: ['inbox', 'archive'],
        labels: ['label-1', 'label-2'],
        read: false,
        limit: 10,
        after: threadId,
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads?folders=inbox%2Carchive&labels=label-1%2Clabel-2&read=false&limit=10&after=${threadId}`,
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });

    it('returns a validation error', async () => {
      const error: ErrorResponse = {
        name: 'validation_error',
        statusCode: 422,
        message: 'The `after` parameter must be a valid UUID.',
      };

      fetchMock.mockOnce(JSON.stringify(error), {
        status: 422,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.threads.list({
        inboxId,
        after: 'bad',
      });

      expect(data.error).toEqual(error);
      expect(data.data).toBeNull();
    });
  });

  describe('search', () => {
    it('maps every option to its query param on the search path', async () => {
      const response: SearchInboxThreadsResponseSuccess = {
        object: 'list',
        has_more: false,
        data: [
          {
            id: threadId,
            subject: 'Invoice for September',
            from: 'ada@example.com',
            to: ['support@example.com'],
            cc: [],
            bcc: [],
            labels: [],
            message_count: 1,
            has_attachment: true,
            has_draft: false,
            read: false,
            received_at: '2026-09-01T00:00:00.000Z',
            folder: 'archive',
            matched_email_id: 'c3d4e5f6-0000-4000-8000-000000000000',
            highlights: { subject: ['**Invoice** for September'] },
          },
        ],
      };
      mockSuccessResponse(response, { headers: {} });

      const data = await resend.inboxes.threads.search({
        inboxId,
        query: 'invoice',
        folders: ['inbox', 'archive'],
        labels: ['label-1'],
        read: false,
        from: ['ada@example.com', 'bob@example.com'],
        to: ['support@example.com'],
        cc: ['cc@example.com'],
        bcc: ['bcc@example.com'],
        hasAttachment: true,
        startDate: '2026-09-01',
        endDate: '2026-09-30',
        limit: 5,
        before: threadId,
      });

      expect(data.data).toEqual(response);
      const url = new URL(fetchMock.mock.calls[0][0] as string);
      expect(url.pathname).toBe(`/inboxes/${inboxId}/threads/search`);
      expect(Object.fromEntries(url.searchParams)).toEqual({
        query: 'invoice',
        folders: 'inbox,archive',
        labels: 'label-1',
        read: 'false',
        from: 'ada@example.com,bob@example.com',
        to: 'support@example.com',
        cc: 'cc@example.com',
        bcc: 'bcc@example.com',
        has_attachment: 'true',
        start_date: '2026-09-01',
        end_date: '2026-09-30',
        limit: '5',
        before: threadId,
      });
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
        object: 'inbox_thread',
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
          object: 'inbox_thread',
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
