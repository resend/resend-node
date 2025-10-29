import createFetchMock from 'vitest-fetch-mock';
import type { ErrorResponse } from '../../../interfaces';
import { Resend } from '../../../resend';
import { mockSuccessResponse } from '../../../test-utils/mock-fetch';
import type {
  ListAttachmentsApiResponse,
  ListAttachmentsResponseSuccess,
} from './interfaces';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

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
          },
        });

        const result = await resend.emails.receiving.attachments.get({
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
            "headers": {
              "content-type": "application/json",
            },
          }
        `);
      });
    });

    describe('when attachment found', () => {
      it('returns attachment with download URL', async () => {
        const apiResponse = {
          object: 'attachment' as const,
          id: 'att_123',
          filename: 'document.pdf',
          size: 2048,
          content_type: 'application/pdf',
          content_id: 'cid_123',
          content_disposition: 'attachment' as const,
          download_url: 'https://example.com/download/att_123',
          expires_at: '2025-10-18T12:00:00Z',
        };

        fetchMock.mockOnceIf(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments/att_123',
          JSON.stringify(apiResponse),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          },
        );

        const result = await resend.emails.receiving.attachments.get({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          id: 'att_123',
        });

        expect(result).toEqual({
          data: {
            object: 'attachment',
            id: 'att_123',
            filename: 'document.pdf',
            size: 2048,
            content_type: 'application/pdf',
            content_disposition: 'attachment',
            content_id: 'cid_123',
            download_url: 'https://example.com/download/att_123',
            expires_at: '2025-10-18T12:00:00Z',
          },
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });
      });

      it('returns inline attachment with download URL', async () => {
        const apiResponse = {
          object: 'attachment' as const,
          id: 'att_456',
          filename: 'image.png',
          size: 1536,
          content_type: 'image/png',
          content_id: 'cid_456',
          content_disposition: 'inline' as const,
          download_url: 'https://example.com/download/att_456',
          expires_at: '2025-10-18T12:00:00Z',
        };

        fetchMock.mockOnceIf(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments/att_456',
          JSON.stringify(apiResponse),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          },
        );

        const result = await resend.emails.receiving.attachments.get({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          id: 'att_456',
        });

        expect(result).toEqual({
          data: {
            object: 'attachment',
            id: 'att_456',
            filename: 'image.png',
            size: 1536,
            content_type: 'image/png',
            content_disposition: 'inline',
            content_id: 'cid_456',
            download_url: 'https://example.com/download/att_456',
            expires_at: '2025-10-18T12:00:00Z',
          },
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });
      });

      it('handles attachment without optional fields (filename, contentId)', async () => {
        const apiResponse = {
          object: 'attachment' as const,
          id: 'att_789',
          size: 512,
          content_type: 'text/plain',
          content_disposition: 'attachment' as const,
          download_url: 'https://example.com/download/att_789',
          expires_at: '2025-10-18T12:00:00Z',
        };

        fetchMock.mockOnceIf(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments/att_789',
          JSON.stringify(apiResponse),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          },
        );

        const result = await resend.emails.receiving.attachments.get({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
          id: 'att_789',
        });

        expect(result).toEqual({
          data: {
            object: 'attachment',
            id: 'att_789',
            size: 512,
            content_type: 'text/plain',
            content_disposition: 'attachment',
            download_url: 'https://example.com/download/att_789',
            expires_at: '2025-10-18T12:00:00Z',
          },
          error: null,
          headers: {
            'content-type': 'application/json',
          },
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
          size: 2048,
          content_type: 'application/pdf',
          content_id: 'cid_123',
          content_disposition: 'attachment' as const,
          download_url: 'https://example.com/download/att_123',
          expires_at: '2025-10-18T12:00:00Z',
        },
        {
          id: 'att_456',
          filename: 'image.png',
          size: 1536,
          content_type: 'image/png',
          content_id: 'cid_456',
          content_disposition: 'inline' as const,
          download_url: 'https://example.com/download/att_456',
          expires_at: '2025-10-18T12:00:00Z',
        },
      ],
    };

    const headers = {};

    describe('when inbound email not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          statusCode: 404,
          message: 'Email not found',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
          },
        });

        const result = await resend.emails.receiving.attachments.list({
          emailId: '61cda979-919d-4b9d-9638-c148b93ff410',
        });

        expect(result).toEqual({
          data: null,
          error: response,
          headers: {
            'content-type': 'application/json',
          },
        });
      });
    });

    describe('when attachments found', () => {
      it('returns multiple attachments with download URLs', async () => {
        fetchMock.mockOnceIf(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments',
          JSON.stringify(apiResponse),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          },
        );

        const result = await resend.emails.receiving.attachments.list({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
        });

        const expectedResponse: ListAttachmentsResponseSuccess = {
          object: 'list',
          has_more: false,
          data: [
            {
              id: 'att_123',
              filename: 'document.pdf',
              size: 2048,
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment',
              download_url: 'https://example.com/download/att_123',
              expires_at: '2025-10-18T12:00:00Z',
            },
            {
              id: 'att_456',
              filename: 'image.png',
              size: 1536,
              content_type: 'image/png',
              content_id: 'cid_456',
              content_disposition: 'inline',
              download_url: 'https://example.com/download/att_456',
              expires_at: '2025-10-18T12:00:00Z',
            },
          ],
        };

        expect(result).toEqual({
          data: expectedResponse,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });
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
            },
          },
        );

        const result = await resend.emails.receiving.attachments.list({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
        });

        expect(result).toEqual({
          data: emptyResponse,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });
      });
    });

    describe('when no pagination options provided', () => {
      it('calls endpoint without query params and return the response', async () => {
        mockSuccessResponse(apiResponse, {
          headers,
        });

        const result = await resend.emails.receiving.attachments.list({
          emailId: '67d9bcdb-5a02-42d7-8da9-0d6feea18cff',
        });

        const expectedResponse: ListAttachmentsResponseSuccess = {
          object: 'list',
          has_more: false,
          data: [
            {
              id: 'att_123',
              filename: 'document.pdf',
              size: 2048,
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment',
              download_url: 'https://example.com/download/att_123',
              expires_at: '2025-10-18T12:00:00Z',
            },
            {
              id: 'att_456',
              filename: 'image.png',
              size: 1536,
              content_type: 'image/png',
              content_id: 'cid_456',
              content_disposition: 'inline',
              download_url: 'https://example.com/download/att_456',
              expires_at: '2025-10-18T12:00:00Z',
            },
          ],
        };

        expect(result).toEqual({
          data: expectedResponse,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments',
        );
      });
    });

    describe('when pagination options are provided', () => {
      it('calls endpoint passing limit param and return the response', async () => {
        mockSuccessResponse(apiResponse, { headers });

        const result = await resend.emails.receiving.attachments.list({
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
              size: 2048,
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment',
              download_url: 'https://example.com/download/att_123',
              expires_at: '2025-10-18T12:00:00Z',
            },
            {
              id: 'att_456',
              filename: 'image.png',
              size: 1536,
              content_type: 'image/png',
              content_id: 'cid_456',
              content_disposition: 'inline',
              download_url: 'https://example.com/download/att_456',
              expires_at: '2025-10-18T12:00:00Z',
            },
          ],
        };

        expect(result).toEqual({
          data: expectedResponse,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments?limit=10',
        );
      });

      it('calls endpoint passing after param and return the response', async () => {
        mockSuccessResponse(apiResponse, { headers });

        const result = await resend.emails.receiving.attachments.list({
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
              size: 2048,
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment',
              download_url: 'https://example.com/download/att_123',
              expires_at: '2025-10-18T12:00:00Z',
            },
            {
              id: 'att_456',
              filename: 'image.png',
              size: 1536,
              content_type: 'image/png',
              content_id: 'cid_456',
              content_disposition: 'inline',
              download_url: 'https://example.com/download/att_456',
              expires_at: '2025-10-18T12:00:00Z',
            },
          ],
        };

        expect(result).toEqual({
          data: expectedResponse,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments?after=cursor123',
        );
      });

      it('calls endpoint passing before param and return the response', async () => {
        mockSuccessResponse(apiResponse, { headers });

        const result = await resend.emails.receiving.attachments.list({
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
              size: 2048,
              content_type: 'application/pdf',
              content_id: 'cid_123',
              content_disposition: 'attachment',
              download_url: 'https://example.com/download/att_123',
              expires_at: '2025-10-18T12:00:00Z',
            },
            {
              id: 'att_456',
              filename: 'image.png',
              size: 1536,
              content_type: 'image/png',
              content_id: 'cid_456',
              content_disposition: 'inline',
              download_url: 'https://example.com/download/att_456',
              expires_at: '2025-10-18T12:00:00Z',
            },
          ],
        };

        expect(result).toEqual({
          data: expectedResponse,
          error: null,
          headers: {
            'content-type': 'application/json',
          },
        });
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://api.resend.com/emails/receiving/67d9bcdb-5a02-42d7-8da9-0d6feea18cff/attachments?before=cursor123',
        );
      });
    });
  });
});
