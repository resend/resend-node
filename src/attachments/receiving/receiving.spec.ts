import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../../interfaces';
import { Resend } from '../../resend';
import { mockSuccessResponse } from '../../test-utils/mock-fetch';
import type {
  ListAttachmentsApiResponse,
  ListAttachmentsResponseSuccess,
} from './interfaces/list-attachments.interface';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

const pdfContent = 'PDF document content';
const pdfBuffer = Buffer.from(pdfContent);
const pdfBase64 = pdfBuffer.toString('base64');

const imageContent = 'PNG image data';
const imageBuffer = Buffer.from(imageContent);
const imageBase64 = imageBuffer.toString('base64');

const textContent = 'Plain text content';
const textBuffer = Buffer.from(textContent);
const textBase64 = textBuffer.toString('base64');

describe('Receiving', () => {
  afterEach(() => fetchMock.resetMocks());
  afterAll(() => fetchMocker.disableMocks());

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
            download_url: 'https://example.com/download/att_123',
          },
        };

        fetchMock.mockOnceIf(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments/att_123',
          JSON.stringify(apiResponse),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
              Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
            },
          },
        );

        fetchMock.mockOnceIf(
          'https://example.com/download/att_123',
          async () =>
            new Response(pdfBuffer, {
              status: 200,
            }),
        );

        const result = await resend.attachments.receiving.get({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          id: 'att_123',
        });

        expect(result).toEqual({
          data: {
            data: {
              content: pdfBase64,
              content_disposition: 'attachment',
              content_id: 'cid_123',
              content_type: 'application/pdf',
              filename: 'document.pdf',
              id: 'att_123',
            },
            object: 'attachment',
          },
          error: null,
        });
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
            download_url: 'https://example.com/download/att_456',
          },
        };

        fetchMock.mockOnceIf(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments/att_456',
          JSON.stringify(apiResponse),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
              Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
            },
          },
        );

        fetchMock.mockOnceIf(
          'https://example.com/download/att_456',
          async () =>
            new Response(imageBuffer, {
              status: 200,
            }),
        );

        const result = await resend.attachments.receiving.get({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          id: 'att_456',
        });

        expect(result).toEqual({
          data: {
            data: {
              content: imageBase64,
              content_disposition: 'inline',
              content_id: 'cid_456',
              content_type: 'image/png',
              filename: 'image.png',
              id: 'att_456',
            },
            object: 'attachment',
          },
          error: null,
        });
      });

      it('handles attachment without optional fields (filename, contentId)', async () => {
        const apiResponse = {
          object: 'attachment' as const,
          data: {
            // Required fields based on DB schema
            id: 'att_789',
            content_type: 'text/plain',
            content_disposition: 'attachment' as const,
            download_url: 'https://example.com/download/att_789',
            // Optional fields (filename, content_id) omitted
          },
        };

        fetchMock.mockOnceIf(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments/att_789',
          JSON.stringify(apiResponse),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
              Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
            },
          },
        );

        fetchMock.mockOnceIf(
          'https://example.com/download/att_789',
          async () =>
            new Response(textBuffer, {
              status: 200,
            }),
        );

        const result = await resend.attachments.receiving.get({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          id: 'att_789',
        });

        expect(result).toEqual({
          data: {
            data: {
              content: textBase64,
              content_disposition: 'attachment',
              content_type: 'text/plain',
              id: 'att_789',
            },
            object: 'attachment',
          },
          error: null,
        });
      });
    });
  });

  describe('list', () => {
    const apiResponse: ListAttachmentsApiResponse = {
      object: 'list' as const,
      has_more: false,
      data: [
        {
          id: 'att_123',
          filename: 'document.pdf',
          content_type: 'application/pdf',
          content_id: 'cid_123',
          content_disposition: 'attachment' as const,
          download_url: 'https://example.com/download/att_123',
        },
        {
          id: 'att_456',
          filename: 'image.png',
          content_type: 'image/png',
          content_id: 'cid_456',
          content_disposition: 'inline' as const,
          download_url: 'https://example.com/download/att_456',
        },
      ],
    };

    const headers = {
      Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
    };

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
        fetchMock.mockOnceIf(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments',
          JSON.stringify(apiResponse),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
              Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
            },
          },
        );

        fetchMock.mockOnceIf(
          'https://example.com/download/att_123',
          async () =>
            new Response(pdfBuffer, {
              status: 200,
            }),
        );
        fetchMock.mockOnceIf(
          'https://example.com/download/att_456',
          async () =>
            new Response(imageBuffer, {
              status: 200,
            }),
        );

        const result = await resend.attachments.receiving.list({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
        });

        const expectedResponse: ListAttachmentsResponseSuccess = {
          object: 'list',
          has_more: false,
          data: [
            {
              id: 'att_123',
              filename: 'document.pdf',
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment',
              content: pdfBase64,
            },
            {
              id: 'att_456',
              filename: 'image.png',
              content_type: 'image/png',
              content_id: 'cid_456',
              content_disposition: 'inline',
              content: imageBase64,
            },
          ],
        };

        expect(result).toEqual({ data: expectedResponse, error: null });
      });

      it('returns empty array when no attachments', async () => {
        const emptyResponse = {
          object: 'list' as const,
          has_more: false,
          data: [],
        };

        fetchMock.mockOnceIf(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments',
          JSON.stringify(emptyResponse),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
              Authorization: 'Bearer re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop',
            },
          },
        );

        const result = await resend.attachments.receiving.list({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
        });

        expect(result).toEqual({ data: emptyResponse, error: null });
      });
    });

    describe('when no pagination options provided', () => {
      it('calls endpoint without query params and return the response', async () => {
        mockSuccessResponse(apiResponse, {
          headers,
        });

        fetchMock.mockOnceIf(
          'https://example.com/download/att_123',
          async () =>
            new Response(pdfBuffer, {
              status: 200,
            }),
        );
        fetchMock.mockOnceIf(
          'https://example.com/download/att_456',
          async () =>
            new Response(imageBuffer, {
              status: 200,
            }),
        );

        const result = await resend.attachments.receiving.list({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
        });

        const expectedResponse: ListAttachmentsResponseSuccess = {
          object: 'list',
          has_more: false,
          data: [
            {
              id: 'att_123',
              filename: 'document.pdf',
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment',
              content: pdfBase64,
            },
            {
              id: 'att_456',
              filename: 'image.png',
              content_type: 'image/png',
              content_id: 'cid_456',
              content_disposition: 'inline',
              content: imageBase64,
            },
          ],
        };

        expect(result).toEqual({
          data: expectedResponse,
          error: null,
        });
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments',
        );
      });
    });

    describe('when pagination options are provided', () => {
      it('calls endpoint passing limit param and return the response', async () => {
        mockSuccessResponse(apiResponse, { headers });

        fetchMock.mockOnceIf(
          'https://example.com/download/att_123',
          async () =>
            new Response(pdfBuffer, {
              status: 200,
            }),
        );
        fetchMock.mockOnceIf(
          'https://example.com/download/att_456',
          async () =>
            new Response(imageBuffer, {
              status: 200,
            }),
        );

        const result = await resend.attachments.receiving.list({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          limit: 10,
        });

        const expectedResponse: ListAttachmentsResponseSuccess = {
          object: 'list',
          has_more: false,
          data: [
            {
              id: 'att_123',
              filename: 'document.pdf',
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment',
              content: pdfBase64,
            },
            {
              id: 'att_456',
              filename: 'image.png',
              content_type: 'image/png',
              content_id: 'cid_456',
              content_disposition: 'inline',
              content: imageBase64,
            },
          ],
        };

        expect(result).toEqual({
          data: expectedResponse,
          error: null,
        });
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments?limit=10',
        );
      });

      it('calls endpoint passing after param and return the response', async () => {
        mockSuccessResponse(apiResponse, { headers });

        fetchMock.mockOnceIf(
          'https://example.com/download/att_123',
          async () =>
            new Response(pdfBuffer, {
              status: 200,
            }),
        );
        fetchMock.mockOnceIf(
          'https://example.com/download/att_456',
          async () =>
            new Response(imageBuffer, {
              status: 200,
            }),
        );

        const result = await resend.attachments.receiving.list({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          after: 'cursor123',
        });

        const expectedResponse: ListAttachmentsResponseSuccess = {
          object: 'list',
          has_more: false,
          data: [
            {
              id: 'att_123',
              filename: 'document.pdf',
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment',
              content: pdfBase64,
            },
            {
              id: 'att_456',
              filename: 'image.png',
              content_type: 'image/png',
              content_id: 'cid_456',
              content_disposition: 'inline',
              content: imageBase64,
            },
          ],
        };

        expect(result).toEqual({
          data: expectedResponse,
          error: null,
        });
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments?after=cursor123',
        );
      });

      it('calls endpoint passing before param and return the response', async () => {
        mockSuccessResponse(apiResponse, { headers });

        fetchMock.mockOnceIf(
          'https://example.com/download/att_123',
          async () =>
            new Response(pdfBuffer, {
              status: 200,
            }),
        );
        fetchMock.mockOnceIf(
          'https://example.com/download/att_456',
          async () =>
            new Response(imageBuffer, {
              status: 200,
            }),
        );

        const result = await resend.attachments.receiving.list({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          before: 'cursor123',
        });

        const expectedResponse: ListAttachmentsResponseSuccess = {
          object: 'list',
          has_more: false,
          data: [
            {
              id: 'att_123',
              filename: 'document.pdf',
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment',
              content: pdfBase64,
            },
            {
              id: 'att_456',
              filename: 'image.png',
              content_type: 'image/png',
              content_id: 'cid_456',
              content_disposition: 'inline',
              content: imageBase64,
            },
          ],
        };

        expect(result).toEqual({
          data: expectedResponse,
          error: null,
        });
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments?before=cursor123',
        );
      });
    });
  });
});
