import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../../interfaces';
import { Resend } from '../../resend';
import type { InboxMessage } from '../threads/interfaces/thread';
import type { ForwardInboxEmailResponseSuccess } from './interfaces/forward-inbox-email.interface';
import type { ListInboxEmailsResponseSuccess } from './interfaces/list-inbox-emails.interface';
import type { ReplyInboxEmailResponseSuccess } from './interfaces/reply-inbox-email.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

const inboxId = '430eed87-632a-4ea6-90db-0aace67ec228';
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

describe('Inbox emails', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

  describe('list', () => {
    it('lists inbox emails', async () => {
      const response: ListInboxEmailsResponseSuccess = {
        object: 'list',
        has_more: false,
        data: [message],
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.threads.emails.list({
        inboxId,
      });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/emails`,
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });

    it('lists inbox emails with pagination', async () => {
      fetchMock.mockOnce(
        JSON.stringify({ object: 'list', has_more: false, data: [] }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        },
      );

      await resend.inboxes.threads.emails.list({
        inboxId,
        limit: 10,
        after: emailId,
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/emails?limit=10&after=${emailId}`,
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });
  });

  describe('get', () => {
    it('gets an inbox email', async () => {
      fetchMock.mockOnce(JSON.stringify(message), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.threads.emails.get({
        inboxId,
        emailId,
      });

      expect(data.data).toEqual(message);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/emails/${emailId}`,
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });
  });

  describe('reply', () => {
    it('replies to an inbox email', async () => {
      const response: ReplyInboxEmailResponseSuccess = {
        id: 'd4e5f6a7-0000-4000-8000-000000000000',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.threads.emails.reply({
        inboxId,
        emailId,
        text: 'Thanks, sent.',
      });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/emails/${emailId}/reply`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ text: 'Thanks, sent.' }),
        }),
      );
    });

    it('sends cc and bcc', async () => {
      fetchMock.mockOnce(JSON.stringify({}), {
        status: 201,
        headers: {
          'content-type': 'application/json',
        },
      });

      await resend.inboxes.threads.emails.reply({
        inboxId,
        emailId,
        text: 'Thanks, sent.',
        cc: 'manager@example.com',
        bcc: ['audit@example.com', 'archive@example.com'],
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/emails/${emailId}/reply`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            cc: 'manager@example.com',
            bcc: ['audit@example.com', 'archive@example.com'],
            text: 'Thanks, sent.',
          }),
        }),
      );
    });

    it('sends reply_all', async () => {
      fetchMock.mockOnce(JSON.stringify({}), {
        status: 201,
        headers: {
          'content-type': 'application/json',
        },
      });

      await resend.inboxes.threads.emails.reply({
        inboxId,
        emailId,
        text: 'Thanks, sent.',
        replyAll: true,
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/emails/${emailId}/reply`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            text: 'Thanks, sent.',
            reply_all: true,
          }),
        }),
      );
    });

    it('maps attachments to the API shape', async () => {
      fetchMock.mockOnce(JSON.stringify({ id: emailId }), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      await resend.inboxes.threads.emails.reply({
        inboxId,
        emailId,
        text: 'Invoice attached.',
        attachments: [
          {
            filename: 'invoice.txt',
            content: 'aGVsbG8=',
            contentType: 'text/plain',
            contentId: 'invoice',
          },
          { path: 'https://example.com/invoice.pdf' },
        ],
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/emails/${emailId}/reply`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            text: 'Invoice attached.',
            attachments: [
              {
                content: 'aGVsbG8=',
                filename: 'invoice.txt',
                content_type: 'text/plain',
                content_id: 'invoice',
              },
              { path: 'https://example.com/invoice.pdf' },
            ],
          }),
        }),
      );
    });

    it('sends custom headers', async () => {
      fetchMock.mockOnce(JSON.stringify({ id: emailId }), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      await resend.inboxes.threads.emails.reply({
        inboxId,
        emailId,
        text: 'Thanks, sent.',
        headers: { 'X-Ticket-Id': '4821' },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/emails/${emailId}/reply`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            text: 'Thanks, sent.',
            headers: { 'X-Ticket-Id': '4821' },
          }),
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
        emailId,
        text: '',
      });

      expect(data.error).toEqual(error);
      expect(data.data).toBeNull();
    });

    it('sends the Idempotency-Key header when idempotencyKey is provided', async () => {
      fetchMock.mockOnce(JSON.stringify({}), {
        status: 201,
        headers: {
          'content-type': 'application/json',
        },
      });

      const idempotencyKey = 'unique-key-123';

      await resend.inboxes.threads.emails.reply(
        { inboxId, emailId, text: 'Thanks, sent.' },
        { idempotencyKey },
      );

      const lastCall = fetchMock.mock.calls[0];
      expect(lastCall).toBeDefined();

      const headers = new Headers(lastCall[1]?.headers);
      expect(headers.has('Idempotency-Key')).toBe(true);
      expect(headers.get('Idempotency-Key')).toBe(idempotencyKey);
    });
  });

  describe('forward', () => {
    it('forwards an inbox email', async () => {
      const response: ForwardInboxEmailResponseSuccess = {
        id: 'd4e5f6a7-0000-4000-8000-000000000000',
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      const data = await resend.inboxes.threads.emails.forward({
        inboxId,
        emailId,
        to: 'colleague@example.com',
        text: 'See below.',
      });

      expect(data.data).toEqual(response);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/emails/${emailId}/forward`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            to: 'colleague@example.com',
            text: 'See below.',
          }),
        }),
      );
    });

    it('sends cc and bcc', async () => {
      fetchMock.mockOnce(JSON.stringify({}), {
        status: 201,
        headers: {
          'content-type': 'application/json',
        },
      });

      await resend.inboxes.threads.emails.forward({
        inboxId,
        emailId,
        to: ['colleague@example.com'],
        cc: ['manager@example.com'],
        bcc: 'audit@example.com',
        text: 'See below.',
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/emails/${emailId}/forward`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            to: ['colleague@example.com'],
            cc: ['manager@example.com'],
            bcc: 'audit@example.com',
            text: 'See below.',
          }),
        }),
      );
    });

    it('maps attachments to the API shape', async () => {
      fetchMock.mockOnce(JSON.stringify({ id: emailId }), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      await resend.inboxes.threads.emails.forward({
        inboxId,
        emailId,
        to: 'colleague@example.com',
        attachments: [{ filename: 'notes.txt', content: 'aGVsbG8=' }],
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/emails/${emailId}/forward`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            to: 'colleague@example.com',
            attachments: [{ content: 'aGVsbG8=', filename: 'notes.txt' }],
          }),
        }),
      );
    });

    it('sends custom headers', async () => {
      fetchMock.mockOnce(JSON.stringify({ id: emailId }), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

      await resend.inboxes.threads.emails.forward({
        inboxId,
        emailId,
        to: 'colleague@example.com',
        headers: { 'X-Ticket-Id': '4821' },
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `https://api.resend.com/inboxes/${inboxId}/emails/${emailId}/forward`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            to: 'colleague@example.com',
            headers: { 'X-Ticket-Id': '4821' },
          }),
        }),
      );
    });

    it('sends the Idempotency-Key header when idempotencyKey is provided', async () => {
      fetchMock.mockOnce(JSON.stringify({}), {
        status: 201,
        headers: {
          'content-type': 'application/json',
        },
      });

      const idempotencyKey = 'unique-key-123';

      await resend.inboxes.threads.emails.forward(
        {
          inboxId,
          emailId,
          to: 'colleague@example.com',
          text: 'See below.',
        },
        { idempotencyKey },
      );

      const lastCall = fetchMock.mock.calls[0];
      expect(lastCall).toBeDefined();

      const headers = new Headers(lastCall[1]?.headers);
      expect(headers.has('Idempotency-Key')).toBe(true);
      expect(headers.get('Idempotency-Key')).toBe(idempotencyKey);
    });
  });
});
