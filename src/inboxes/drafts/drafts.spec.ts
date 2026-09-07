import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../../interfaces';
import { Resend } from '../../resend';
import { mockSuccessResponse } from '../../test-utils/mock-fetch';
import type { InboxDraft } from './interfaces/draft';
import type { ListInboxDraftsResponseSuccess } from './interfaces/list-inbox-drafts.interface';
import type { RemoveInboxDraftResponseSuccess } from './interfaces/remove-inbox-draft.interface';
import type { SendInboxDraftResponseSuccess } from './interfaces/send-inbox-draft.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

const inboxId = '430eed87-632a-4ea6-90db-0aace67ec228';
const draftId = 'e5f6a7b8-0000-4000-8000-000000000000';

const draft: InboxDraft = {
  object: 'inbox_draft',
  id: draftId,
  type: 'standalone',
  to: ['ada@example.com'],
  cc: [],
  bcc: [],
  subject: 'Hello',
  html: null,
  text: 'Hi',
  thread_id: null,
  reply_to_email_id: null,
  email_id: null,
  created_at: '2026-09-01T00:00:00.000Z',
  updated_at: '2026-09-01T00:00:00.000Z',
};

describe('Inbox drafts', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('list', () => {
    const response: ListInboxDraftsResponseSuccess = {
      object: 'list',
      has_more: true,
      next_cursor: 'cursor_drafts',
      data: [
        {
          id: draftId,
          type: 'standalone',
          to: ['ada@example.com'],
          cc: [],
          bcc: [],
          subject: 'Hello',
          snippet: 'Hi',
          thread_id: null,
          reply_to_email_id: null,
          updated_at: '2026-09-01T00:00:00.000Z',
        },
      ],
    };

    it('lists drafts', async () => {
      mockSuccessResponse(response, { headers: {} });

      const data = await resend.inboxes.drafts.list(inboxId);

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/drafts`,
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });

    it('propagates the cursor', async () => {
      mockSuccessResponse(response, { headers: {} });

      await resend.inboxes.drafts.list(inboxId, { cursor: 'cursor_drafts' });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/drafts?cursor=cursor_drafts`,
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });
  });

  describe('create', () => {
    it('creates a draft', async () => {
      fetchMock.mockOnce(JSON.stringify(draft), {
        status: 201,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.drafts.create(inboxId, {
        to: ['ada@example.com'],
        subject: 'Hello',
        text: 'Hi',
      });

      expect(data.data).toEqual(draft);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/drafts`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            to: ['ada@example.com'],
            subject: 'Hello',
            text: 'Hi',
          }),
        }),
      );
    });

    it('returns a validation error', async () => {
      const error: ErrorResponse = {
        name: 'validation_error',
        statusCode: 422,
        message: 'A draft must contain at least one non-empty field.',
      };

      fetchMock.mockOnce(JSON.stringify(error), {
        status: 422,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.drafts.create(inboxId, {});

      expect(data.error).toEqual(error);
      expect(data.data).toBeNull();
    });
  });

  describe('get', () => {
    it('gets a draft', async () => {
      fetchMock.mockOnce(JSON.stringify(draft), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.drafts.get(inboxId, draftId);

      expect(data.data).toEqual(draft);
    });
  });

  describe('update', () => {
    it('updates a draft', async () => {
      const updated = { ...draft, subject: 'Updated' };

      fetchMock.mockOnce(JSON.stringify(updated), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.drafts.update(inboxId, draftId, {
        subject: 'Updated',
      });

      expect(data.data).toEqual(updated);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/drafts/${draftId}`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ subject: 'Updated' }),
        }),
      );
    });
  });

  describe('remove', () => {
    it('removes a draft', async () => {
      const response: RemoveInboxDraftResponseSuccess = {
        object: 'inbox_draft',
        id: draftId,
        deleted: true,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.drafts.remove(inboxId, draftId);

      expect(data.data).toEqual(response);
    });
  });

  describe('send', () => {
    it('sends a draft', async () => {
      const response: SendInboxDraftResponseSuccess = {
        object: 'inbox_draft',
        id: draftId,
        thread_id: 'b2c3d4e5-0000-4000-8000-000000000000',
        email_id: 'c3d4e5f6-0000-4000-8000-000000000000',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.drafts.send(inboxId, draftId);

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/drafts/${draftId}/send`,
        expect.objectContaining({
          method: 'POST',
        }),
      );
    });
  });
});
