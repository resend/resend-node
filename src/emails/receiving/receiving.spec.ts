import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../../interfaces';
import { Resend } from '../../resend';
import type {
  ForwardReceivingEmailResponseSuccess,
  GetReceivingEmailResponseSuccess,
  ListReceivingEmailsResponseSuccess,
} from './interfaces';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

describe('Receiving', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('get', () => {
    describe('when inbound email not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Email not found',
          statusCode: 404,
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
          },
        });

        const result = resend.emails.receiving.get(
          '61cda979-919d-4b9d-9638-c148b93ff410',
        );

        await expect(result).resolves.toMatchInlineSnapshot(`
          {
            "data": null,
            "error": {
              "message": "Email not found",
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

    describe('when inbound email found', () => {
      it('returns inbound email', async () => {
        const apiResponse: GetReceivingEmailResponseSuccess = {
          object: 'email' as const,
          id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: ['received@example.com'],
          from: 'sender@example.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
          subject: 'Test inbound email',
          html: '<p>hello world</p>',
          text: 'hello world',
          bcc: null,
          cc: ['cc@example.com'],
          reply_to: ['reply@example.com'],
          headers: {
            example: 'value',
          },
          raw: {
            download_url:
              'https://example.com/emails/raw/abc123?signature=xyz789',
            expires_at: '2023-04-08T00:13:52.669661+00:00',
          },
          attachments: [
            {
              id: 'att_123',
              filename: 'document.pdf',
              size: 1024,
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment',
            },
          ],
          message_id: 'msg_123',
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });

        const result = await resend.emails.receiving.get(
          '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
        );

        expect(result).toMatchInlineSnapshot(`
          {
            "data": {
              "attachments": [
                {
                  "content_disposition": "attachment",
                  "content_id": "cid_123",
                  "content_type": "application/pdf",
                  "filename": "document.pdf",
                  "id": "att_123",
                  "size": 1024,
                },
              ],
              "bcc": null,
              "cc": [
                "cc@example.com",
              ],
              "created_at": "2023-04-07T23:13:52.669661+00:00",
              "from": "sender@example.com",
              "headers": {
                "example": "value",
              },
              "html": "<p>hello world</p>",
              "id": "67d9bcdb-5a02-42d7-8da9-0d6feea18cff",
              "message_id": "msg_123",
              "object": "email",
              "raw": {
                "download_url": "https://example.com/emails/raw/abc123?signature=xyz789",
                "expires_at": "2023-04-08T00:13:52.669661+00:00",
              },
              "reply_to": [
                "reply@example.com",
              ],
              "subject": "Test inbound email",
              "text": "hello world",
              "to": [
                "received@example.com",
              ],
            },
            "error": null,
            "headers": {
              "content-type": "application/json",
            },
          }
        `);
      });

      it('returns inbound email with no attachments', async () => {
        const apiResponse: GetReceivingEmailResponseSuccess = {
          object: 'email' as const,
          id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: ['received@example.com'],
          from: 'sender@example.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
          subject: 'Test inbound email',
          html: null,
          text: 'hello world',
          bcc: null,
          cc: null,
          reply_to: null,
          headers: {},
          raw: null,
          attachments: [],
          message_id: 'msg_456',
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });

        const result = await resend.emails.receiving.get(
          '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
        );

        expect(result).toMatchInlineSnapshot(`
          {
            "data": {
              "attachments": [],
              "bcc": null,
              "cc": null,
              "created_at": "2023-04-07T23:13:52.669661+00:00",
              "from": "sender@example.com",
              "headers": {},
              "html": null,
              "id": "67d9bcdb-5a02-42d7-8da9-0d6feea18cff",
              "message_id": "msg_456",
              "object": "email",
              "raw": null,
              "reply_to": null,
              "subject": "Test inbound email",
              "text": "hello world",
              "to": [
                "received@example.com",
              ],
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

  describe('list', () => {
    describe('when no inbound emails found', () => {
      it('returns empty list', async () => {
        const response = {
          object: 'list' as const,
          has_more: false,
          data: [],
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });

        const result = await resend.emails.receiving.list();

        expect(result).toMatchInlineSnapshot(`
          {
            "data": {
              "data": [],
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

    describe('when inbound emails found', () => {
      it('returns list of inbound emails with transformed fields', async () => {
        const apiResponse: ListReceivingEmailsResponseSuccess = {
          object: 'list' as const,
          has_more: true,
          data: [
            {
              id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
              to: ['received@example.com'],
              from: 'sender@example.com',
              created_at: '2023-04-07T23:13:52.669661+00:00',
              subject: 'Test inbound email 1',
              bcc: null,
              cc: ['cc@example.com'],
              reply_to: ['reply@example.com'],
              attachments: [
                {
                  id: 'att_123',
                  filename: 'document.pdf',
                  size: 1024,
                  content_type: 'application/pdf',
                  content_id: 'cid_123',
                  content_disposition: 'attachment' as const,
                },
              ],
              message_id: 'msg_789',
            },
            {
              id: '87e9bcdb-6b03-43e8-9ea0-1e7gffa19d00',
              to: ['another@example.com'],
              from: 'sender2@example.com',
              created_at: '2023-04-08T10:20:30.123456+00:00',
              subject: 'Test inbound email 2',
              bcc: ['bcc@example.com'],
              cc: null,
              reply_to: null,
              attachments: [],
              message_id: 'msg_012',
            },
          ],
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });

        const result = await resend.emails.receiving.list();

        expect(result).toMatchInlineSnapshot(`
          {
            "data": {
              "data": [
                {
                  "attachments": [
                    {
                      "content_disposition": "attachment",
                      "content_id": "cid_123",
                      "content_type": "application/pdf",
                      "filename": "document.pdf",
                      "id": "att_123",
                      "size": 1024,
                    },
                  ],
                  "bcc": null,
                  "cc": [
                    "cc@example.com",
                  ],
                  "created_at": "2023-04-07T23:13:52.669661+00:00",
                  "from": "sender@example.com",
                  "id": "67d9bcdb-5a02-42d7-8da9-0d6feea18cff",
                  "message_id": "msg_789",
                  "reply_to": [
                    "reply@example.com",
                  ],
                  "subject": "Test inbound email 1",
                  "to": [
                    "received@example.com",
                  ],
                },
                {
                  "attachments": [],
                  "bcc": [
                    "bcc@example.com",
                  ],
                  "cc": null,
                  "created_at": "2023-04-08T10:20:30.123456+00:00",
                  "from": "sender2@example.com",
                  "id": "87e9bcdb-6b03-43e8-9ea0-1e7gffa19d00",
                  "message_id": "msg_012",
                  "reply_to": null,
                  "subject": "Test inbound email 2",
                  "to": [
                    "another@example.com",
                  ],
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

      it('supports pagination with limit parameter', async () => {
        const apiResponse = {
          object: 'list' as const,
          has_more: true,
          data: [
            {
              id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
              to: ['received@example.com'],
              from: 'sender@example.com',
              created_at: '2023-04-07T23:13:52.669661+00:00',
              subject: 'Test inbound email',
              bcc: null,
              cc: null,
              reply_to: null,
              attachments: [],
            },
          ],
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });

        await resend.emails.receiving.list({ limit: 10 });

        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails/receiving?limit=10',
        );
      });

      it('supports pagination with after parameter', async () => {
        const apiResponse = {
          object: 'list' as const,
          has_more: false,
          data: [],
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });

        await resend.emails.receiving.list({ after: 'cursor123' });

        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails/receiving?after=cursor123',
        );
      });

      it('supports pagination with before parameter', async () => {
        const apiResponse = {
          object: 'list' as const,
          has_more: false,
          data: [],
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        });

        await resend.emails.receiving.list({ before: 'cursor456' });

        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails/receiving?before=cursor456',
        );
      });
    });
  });

  describe('forward', () => {
    describe('when email not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Email not found',
          statusCode: 404,
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
          },
        });

        const result = await resend.emails.receiving.forward({
          emailId: '61cda979-919d-4b9d-9638-c148b93ff410',
          to: 'forward@example.com',
          from: 'sender@verified-domain.com',
        });

        expect(result).toMatchInlineSnapshot(`
          {
            "data": null,
            "error": {
              "message": "Email not found",
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

    describe('passthrough mode (default)', () => {
      it('sends email with original content directly', async () => {
        const getEmailResponse: GetReceivingEmailResponseSuccess = {
          object: 'email' as const,
          id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: ['received@example.com'],
          from: 'original-sender@example.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
          subject: 'Original Subject',
          html: '<p>hello world</p>',
          text: 'hello world',
          bcc: null,
          cc: null,
          reply_to: null,
          headers: {},
          raw: {
            download_url: 'https://example.com/raw-email-download',
            expires_at: '2023-04-08T00:13:52.669661+00:00',
          },
          attachments: [],
          message_id: 'msg_123',
        };

        const forwardResponse: ForwardReceivingEmailResponseSuccess = {
          id: 'new-email-id-123',
        };

        fetchMock.mockOnce(JSON.stringify(getEmailResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        fetchMock.mockOnce(JSON.stringify(forwardResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        const result = await resend.emails.receiving.forward({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: 'forward@example.com',
          from: 'sender@verified-domain.com',
        });

        expect(result).toMatchInlineSnapshot(`
          {
            "data": {
              "id": "new-email-id-123",
            },
            "error": null,
            "headers": {
              "content-type": "application/json",
            },
          }
        `);

        const sendEmailCall = fetchMock.mock.calls[1];
        expect(sendEmailCall[0]).toBe('https://api.resend.com/emails');

        const sendEmailBody = JSON.parse(sendEmailCall[1]?.body as string);
        expect(sendEmailBody.from).toBe('sender@verified-domain.com');
        expect(sendEmailBody.to).toBe('forward@example.com');
        expect(sendEmailBody.subject).toBe('Original Subject');
        expect(sendEmailBody.text).toBe('hello world');
        expect(sendEmailBody.html).toBe('<p>hello world</p>');
        expect(sendEmailBody.attachments).toBeUndefined();
      });

      it('includes original attachments', async () => {
        const getEmailResponse: GetReceivingEmailResponseSuccess = {
          object: 'email' as const,
          id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: ['received@example.com'],
          from: 'original-sender@example.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
          subject: 'Email with attachment',
          html: '<p>See attached</p>',
          text: 'See attached',
          bcc: null,
          cc: null,
          reply_to: null,
          headers: {},
          raw: null,
          attachments: [
            {
              id: 'att_123',
              filename: 'document.pdf',
              size: 1024,
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment',
            },
          ],
          message_id: 'msg_123',
        };

        const attachmentDetails = {
          object: 'attachment' as const,
          id: 'att_123',
          filename: 'document.pdf',
          size: 1024,
          content_type: 'application/pdf',
          content_disposition: 'attachment' as const,
          download_url: 'https://example.com/attachment-download',
          expires_at: '2023-04-08T00:13:52.669661+00:00',
        };

        const attachmentContent = 'PDF content here';

        const forwardResponse: ForwardReceivingEmailResponseSuccess = {
          id: 'new-email-id-456',
        };

        fetchMock.mockOnce(JSON.stringify(getEmailResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        fetchMock.mockOnce(JSON.stringify(attachmentDetails), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        fetchMock.mockOnce(attachmentContent, {
          status: 200,
          headers: { 'content-type': 'application/pdf' },
        });

        fetchMock.mockOnce(JSON.stringify(forwardResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        await resend.emails.receiving.forward({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: 'forward@example.com',
          from: 'sender@verified-domain.com',
        });

        const sendEmailCall = fetchMock.mock.calls[3];
        const sendEmailBody = JSON.parse(sendEmailCall[1]?.body as string);

        expect(sendEmailBody.attachments).toHaveLength(1);
        expect(sendEmailBody.attachments[0].filename).toBe('document.pdf');
        expect(sendEmailBody.attachments[0].content_type).toBe(
          'application/pdf',
        );
        expect(sendEmailBody.attachments[0].content).toBe(
          Buffer.from(attachmentContent).toString('base64'),
        );
      });

      it('handles email with no subject', async () => {
        const getEmailResponse: GetReceivingEmailResponseSuccess = {
          object: 'email' as const,
          id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: ['received@example.com'],
          from: 'original-sender@example.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
          subject: '',
          html: null,
          text: 'hello world',
          bcc: null,
          cc: null,
          reply_to: null,
          headers: {},
          raw: null,
          attachments: [],
          message_id: 'msg_123',
        };

        const forwardResponse: ForwardReceivingEmailResponseSuccess = {
          id: 'new-email-id-789',
        };

        fetchMock.mockOnce(JSON.stringify(getEmailResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        fetchMock.mockOnce(JSON.stringify(forwardResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        await resend.emails.receiving.forward({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: 'forward@example.com',
          from: 'sender@verified-domain.com',
        });

        const sendEmailBody = JSON.parse(
          fetchMock.mock.calls[1][1]?.body as string,
        );
        expect(sendEmailBody.subject).toBe('(no subject)');
      });
    });

    describe('wrapped mode (passthrough: false)', () => {
      it('sends forwarded email with raw content as .eml attachment', async () => {
        const getEmailResponse: GetReceivingEmailResponseSuccess = {
          object: 'email' as const,
          id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: ['received@example.com'],
          from: 'original-sender@example.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
          subject: 'Original Subject',
          html: '<p>hello world</p>',
          text: 'hello world',
          bcc: null,
          cc: null,
          reply_to: null,
          headers: {},
          raw: {
            download_url: 'https://example.com/raw-email-download',
            expires_at: '2023-04-08T00:13:52.669661+00:00',
          },
          attachments: [],
          message_id: 'msg_123',
        };

        const rawEmailContent =
          'From: original-sender@example.com\r\nTo: received@example.com\r\nSubject: Original Subject\r\n\r\nhello world';

        const forwardResponse: ForwardReceivingEmailResponseSuccess = {
          id: 'new-email-id-123',
        };

        fetchMock.mockOnce(JSON.stringify(getEmailResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        fetchMock.mockOnce(rawEmailContent, {
          status: 200,
          headers: { 'content-type': 'message/rfc822' },
        });

        fetchMock.mockOnce(JSON.stringify(forwardResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        const result = await resend.emails.receiving.forward({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: 'forward@example.com',
          from: 'sender@verified-domain.com',
          passthrough: false,
          text: 'Forwarded email.',
        });

        expect(result).toMatchInlineSnapshot(`
          {
            "data": {
              "id": "new-email-id-123",
            },
            "error": null,
            "headers": {
              "content-type": "application/json",
            },
          }
        `);

        const sendEmailCall = fetchMock.mock.calls[2];
        expect(sendEmailCall[0]).toBe('https://api.resend.com/emails');

        const sendEmailBody = JSON.parse(sendEmailCall[1]?.body as string);
        expect(sendEmailBody.from).toBe('sender@verified-domain.com');
        expect(sendEmailBody.to).toBe('forward@example.com');
        expect(sendEmailBody.subject).toBe('Fwd: Original Subject');
        expect(sendEmailBody.text).toBe('Forwarded email.');
        expect(sendEmailBody.attachments).toHaveLength(1);
        expect(sendEmailBody.attachments[0].filename).toBe(
          'forwarded_message.eml',
        );
        expect(sendEmailBody.attachments[0].content_type).toBe(
          'message/rfc822',
        );
        expect(sendEmailBody.attachments[0].content).toBe(
          Buffer.from(rawEmailContent).toString('base64'),
        );
      });

      it('returns error when email has no raw content', async () => {
        const apiResponse: GetReceivingEmailResponseSuccess = {
          object: 'email' as const,
          id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: ['received@example.com'],
          from: 'sender@example.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
          subject: 'Test email',
          html: null,
          text: 'hello world',
          bcc: null,
          cc: null,
          reply_to: null,
          headers: {},
          raw: null,
          attachments: [],
          message_id: 'msg_123',
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        const result = await resend.emails.receiving.forward({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: 'forward@example.com',
          from: 'sender@verified-domain.com',
          passthrough: false,
          text: 'Forwarded email.',
        });

        expect(result).toMatchInlineSnapshot(`
          {
            "data": null,
            "error": {
              "message": "Raw email content is not available for this email",
              "name": "validation_error",
              "statusCode": 400,
            },
            "headers": null,
          }
        `);
      });

      it('returns error when raw email download fails', async () => {
        const getEmailResponse: GetReceivingEmailResponseSuccess = {
          object: 'email' as const,
          id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: ['received@example.com'],
          from: 'original-sender@example.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
          subject: 'Test Subject',
          html: null,
          text: 'hello world',
          bcc: null,
          cc: null,
          reply_to: null,
          headers: {},
          raw: {
            download_url: 'https://example.com/raw-email-download',
            expires_at: '2023-04-08T00:13:52.669661+00:00',
          },
          attachments: [],
          message_id: 'msg_123',
        };

        fetchMock.mockOnce(JSON.stringify(getEmailResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        fetchMock.mockOnce('Not Found', {
          status: 404,
          headers: { 'content-type': 'text/plain' },
        });

        const result = await resend.emails.receiving.forward({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: 'forward@example.com',
          from: 'sender@verified-domain.com',
          passthrough: false,
          text: 'Forwarded email.',
        });

        expect(result).toMatchInlineSnapshot(`
          {
            "data": null,
            "error": {
              "message": "Failed to download raw email content",
              "name": "application_error",
              "statusCode": 404,
            },
            "headers": null,
          }
        `);
      });

      it('includes text and html body', async () => {
        const getEmailResponse: GetReceivingEmailResponseSuccess = {
          object: 'email' as const,
          id: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: ['received@example.com'],
          from: 'original-sender@example.com',
          created_at: '2023-04-07T23:13:52.669661+00:00',
          subject: 'Test Subject',
          html: null,
          text: 'hello world',
          bcc: null,
          cc: null,
          reply_to: null,
          headers: {},
          raw: {
            download_url: 'https://example.com/raw-email-download',
            expires_at: '2023-04-08T00:13:52.669661+00:00',
          },
          attachments: [],
          message_id: 'msg_123',
        };

        const rawEmailContent = 'raw email content';

        const forwardResponse: ForwardReceivingEmailResponseSuccess = {
          id: 'new-email-id-789',
        };

        fetchMock.mockOnce(JSON.stringify(getEmailResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        fetchMock.mockOnce(rawEmailContent, {
          status: 200,
          headers: { 'content-type': 'message/rfc822' },
        });

        fetchMock.mockOnce(JSON.stringify(forwardResponse), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        await resend.emails.receiving.forward({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          to: 'forward@example.com',
          from: 'sender@verified-domain.com',
          passthrough: false,
          text: 'Please see the forwarded email attached.',
          html: '<p>Please see the forwarded email attached.</p>',
        });

        const sendEmailBody = JSON.parse(
          fetchMock.mock.calls[2][1]?.body as string,
        );
        expect(sendEmailBody.text).toBe(
          'Please see the forwarded email attached.',
        );
        expect(sendEmailBody.html).toBe(
          '<p>Please see the forwarded email attached.</p>',
        );
      });
    });
  });
});
