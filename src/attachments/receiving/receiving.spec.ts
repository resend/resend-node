import type { ErrorResponse } from '../../interfaces';
import { Resend } from '../../resend';

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

describe('Receiving', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('get', () => {
    describe('when attachment not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Attachment not found',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        });

        const result = await resend.attachments.receiving.get({
          emailId: '61cda979-919d-4b9d-9638-c148b93ff410',
          id: 'att_123',
        });

        expect(result).toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Attachment not found",
    "name": "not_found",
  },
}
`);
      });
    });

    describe('when attachment found', () => {
      it('returns attachment with transformed fields', async () => {
        const apiResponse = {
          object: 'attachment' as const,
          data: {
            id: 'att_123',
            filename: 'document.pdf',
            content_type: 'application/pdf',
            content_id: 'cid_123',
            content_disposition: 'attachment' as const,
            content: 'base64encodedcontent==',
          },
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        });

        const result = await resend.attachments.receiving.get({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          id: 'att_123',
        });

        expect(result).toMatchInlineSnapshot(`
{
  "data": {
    "data": {
      "content": "base64encodedcontent==",
      "content_disposition": "attachment",
      "content_id": "cid_123",
      "content_type": "application/pdf",
      "filename": "document.pdf",
      "id": "att_123",
    },
    "object": "attachment",
  },
  "error": null,
}
`);
      });

      it('returns inline attachment', async () => {
        const apiResponse = {
          object: 'attachment' as const,
          data: {
            id: 'att_456',
            filename: 'image.png',
            content_type: 'image/png',
            content_id: 'cid_456',
            content_disposition: 'inline' as const,
            content:
              'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
          },
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        });

        const result = await resend.attachments.receiving.get({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          id: 'att_456',
        });

        expect(result).toMatchInlineSnapshot(`
{
  "data": {
    "data": {
      "content": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "content_disposition": "inline",
      "content_id": "cid_456",
      "content_type": "image/png",
      "filename": "image.png",
      "id": "att_456",
    },
    "object": "attachment",
  },
  "error": null,
}
`);
      });

      it('handles attachment without optional fields (filename, contentId)', async () => {
        const apiResponse = {
          object: 'attachment' as const,
          data: {
            // Required fields based on DB schema
            id: 'att_789',
            content_type: 'text/plain',
            content_disposition: 'attachment' as const,
            content: 'base64content',
            // Optional fields (filename, content_id) omitted
          },
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        });

        const result = await resend.attachments.receiving.get({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          id: 'att_789',
        });

        expect(result).toMatchInlineSnapshot(`
{
  "data": {
    "data": {
      "content": "base64content",
      "content_disposition": "attachment",
      "content_type": "text/plain",
      "id": "att_789",
    },
    "object": "attachment",
  },
  "error": null,
}
`);
      });
    });
  });

  describe('list', () => {
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

        const result = await resend.attachments.receiving.list({
          emailId: '61cda979-919d-4b9d-9638-c148b93ff410',
        });

        expect(result).toEqual({ data: null, error: response });
      });
    });

    describe('when attachments found', () => {
      it('returns multiple attachments', async () => {
        const apiResponse = {
          object: 'attachment' as const,
          data: [
            {
              id: 'att_123',
              filename: 'document.pdf',
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment' as const,
              content: 'base64encodedcontent==',
            },
            {
              id: 'att_456',
              filename: 'image.png',
              content_type: 'image/png',
              content_id: 'cid_456',
              content_disposition: 'inline' as const,
              content: 'imagebase64==',
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

        const result = await resend.attachments.receiving.list({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
        });

        expect(result).toEqual({ data: apiResponse, error: null });
      });

      it('returns empty array when no attachments', async () => {
        const apiResponse = {
          object: 'attachment' as const,
          data: [],
        };

        fetchMock.mockOnce(JSON.stringify(apiResponse), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
          },
        });

        const result = await resend.attachments.receiving.list({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
        });

        expect(result).toEqual({ data: apiResponse, error: null });
      });
    });
  });
});
