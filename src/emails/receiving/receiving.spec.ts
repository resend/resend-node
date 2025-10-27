import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../../interfaces';
import { Resend } from '../../resend';
import type {
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
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
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
          attachments: [
            {
              id: 'att_123',
              filename: 'document.pdf',
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment',
            },
          ],
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
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
    "object": "email",
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
          attachments: [],
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
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
    "object": "email",
    "reply_to": null,
    "subject": "Test inbound email",
    "text": "hello world",
    "to": [
      "received@example.com",
    ],
  },
  "error": null,
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
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
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
                  content_type: 'application/pdf',
                  content_id: 'cid_123',
                  content_disposition: 'attachment' as const,
                },
              ],
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
            },
          ],
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
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
          },
        ],
        "bcc": null,
        "cc": [
          "cc@example.com",
        ],
        "created_at": "2023-04-07T23:13:52.669661+00:00",
        "from": "sender@example.com",
        "id": "67d9bcdb-5a02-42d7-8da9-0d6feea18cff",
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
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
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
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
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
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        });

        await resend.emails.receiving.list({ before: 'cursor456' });

        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails/receiving?before=cursor456',
        );
      });
    });
  });
});
