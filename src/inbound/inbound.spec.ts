import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

describe('Inbound', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('get', () => {
    describe('when inbound email not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Inbound email not found',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        });

        const result = resend.inbound.get(
          '61cda979-919d-4b9d-9638-c148b93ff410',
        );

        await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Inbound email not found",
    "name": "not_found",
  },
}
`);
      });
    });

    describe('when inbound email found', () => {
      it('returns inbound email with transformed fields', async () => {
        const apiResponse = {
          object: 'inbound' as const,
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

        const result = await resend.inbound.get(
          '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
        );

        expect(result).toMatchInlineSnapshot(`
{
  "data": {
    "attachments": [
      {
        "contentDisposition": "attachment",
        "contentId": "cid_123",
        "contentType": "application/pdf",
        "filename": "document.pdf",
        "id": "att_123",
      },
    ],
    "bcc": null,
    "cc": [
      "cc@example.com",
    ],
    "createdAt": "2023-04-07T23:13:52.669661+00:00",
    "from": "sender@example.com",
    "headers": {
      "example": "value",
    },
    "html": "<p>hello world</p>",
    "id": "67d9bcdb-5a02-42d7-8da9-0d6feea18cff",
    "object": "inbound",
    "replyTo": [
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
        const apiResponse = {
          object: 'inbound' as const,
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

        const result = await resend.inbound.get(
          '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
        );

        expect(result).toMatchInlineSnapshot(`
{
  "data": {
    "attachments": [],
    "bcc": null,
    "cc": null,
    "createdAt": "2023-04-07T23:13:52.669661+00:00",
    "from": "sender@example.com",
    "headers": {},
    "html": null,
    "id": "67d9bcdb-5a02-42d7-8da9-0d6feea18cff",
    "object": "inbound",
    "replyTo": null,
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
});
