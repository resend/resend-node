import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../../../interfaces';
import { Resend } from '../../../resend';
import type { ForwardInboxThreadEmailResponseSuccess } from '../interfaces/forward-inbox-thread-email.interface';
import type { ReplyInboxThreadEmailResponseSuccess } from '../interfaces/reply-inbox-thread-email.interface';
import type { InboxMessage } from '../interfaces/thread';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

const inboxId = '430eed87-632a-4ea6-90db-0aace67ec228';
const threadId = 'b2c3d4e5-0000-4000-8000-000000000000';
const emailId = 'c3d4e5f6-0000-4000-8000-000000000000';

const message: InboxMessage = {
  id: emailId,
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
  attachments: [{ id: '0', filename: 'invoice.pdf', size: 1024 }],
  read: true,
  received_at: '2026-09-01T00:00:00.000Z',
};

describe('Inbox thread emails', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('get', () => {
    it('gets a thread email', async () => {
      fetchMock.mockOnce(JSON.stringify(message), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.threads.emails.get({
        inboxId,
        threadId,
        emailId,
      });

      expect(data.data).toEqual(message);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}`,
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });
  });

  describe('reply', () => {
    it('replies to a thread email', async () => {
      const response: ReplyInboxThreadEmailResponseSuccess = {
        ...message,
        direction: 'outbound',
        email_id: 'd4e5f6a7-0000-4000-8000-000000000000',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 201,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.threads.emails.reply({
        inboxId,
        threadId,
        emailId,
        text: 'Thanks, sent.',
      });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}/reply`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ text: 'Thanks, sent.' }),
        }),
      );
    });

    it('returns a validation error', async () => {
      const error: ErrorResponse = {
        name: 'missing_required_field',
        statusCode: 422,
        message: 'Missing `html` or `text` field.',
      };

      fetchMock.mockOnce(JSON.stringify(error), {
        status: 422,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.threads.emails.reply({
        inboxId,
        threadId,
        emailId,
        text: '',
      });

      expect(data.error).toEqual(error);
      expect(data.data).toBeNull();
    });
  });

  describe('forward', () => {
    it('forwards a thread email', async () => {
      const response: ForwardInboxThreadEmailResponseSuccess = {
        id: 'd4e5f6a7-0000-4000-8000-000000000000',
        email_id: 'd4e5f6a7-0000-4000-8000-000000000000',
        direction: 'outbound',
        from: 'support@example.com',
        to: ['colleague@example.com'],
        cc: [],
        bcc: [],
        html: null,
        text: 'See below.',
        attachments: [],
        read: true,
        received_at: '2026-09-01T00:00:00.000Z',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 201,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.threads.emails.forward({
        inboxId,
        threadId,
        emailId,
        to: 'colleague@example.com',
        text: 'See below.',
      });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}/forward`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            to: 'colleague@example.com',
            text: 'See below.',
          }),
        }),
      );
    });
  });
});
