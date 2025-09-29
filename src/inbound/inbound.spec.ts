import type { ErrorResponse } from '../interfaces';
import { Resend } from '../resend';
import type { GetInboundEmailResponseSuccess } from './interfaces/get-inbound-email.interface';

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
            Authorization: 'Bearer re_924b3rjh2387fbewf823',
          },
        });

        const result = resend.inbound.get(
          '987770eb-185c-4059-ab73-f0faad7c05d3',
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

    it('gets inbound email', async () => {
      const response: GetInboundEmailResponseSuccess = {
        object: 'inbound_email',
        id: '987770eb-185c-4059-ab73-f0faad7c05d3',
        to: ['delivered@resend.dev'],
        from: 'sender@example.com',
        subject: 'Test Email',
        html: '<p>Hello World</p>',
        text: 'Hello World',
        reply_to: null,
        cc: [],
        bcc: [],
        created_at: '2024-09-29T12:00:00.000Z',
        attachments: null,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      await expect(
        resend.inbound.get('987770eb-185c-4059-ab73-f0faad7c05d3'),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "attachments": null,
    "bcc": [],
    "cc": [],
    "created_at": "2024-09-29T12:00:00.000Z",
    "from": "sender@example.com",
    "html": "<p>Hello World</p>",
    "id": "987770eb-185c-4059-ab73-f0faad7c05d3",
    "object": "inbound_email",
    "reply_to": null,
    "subject": "Test Email",
    "text": "Hello World",
    "to": [
      "delivered@resend.dev",
    ],
  },
  "error": null,
}
`);
    });

    it('gets inbound email with attachments and converts to Buffer', async () => {
      // Simulating how attachment content comes from the API (as serialized buffer data)
      const mockBufferData = [72, 101, 108, 108, 111]; // "Hello" in ASCII

      const response = {
        object: 'inbound_email',
        id: '987770eb-185c-4059-ab73-f0faad7c05d3',
        to: ['delivered@resend.dev'],
        from: 'sender@example.com',
        subject: 'Test Email with Attachment',
        html: '<p>Email with attachment</p>',
        text: 'Email with attachment',
        reply_to: null,
        cc: [],
        bcc: [],
        created_at: '2024-09-29T12:00:00.000Z',
        attachments: [
          {
            filename: 'test.txt',
            contentType: 'text/plain',
            size: 5,
            contentDisposition: 'attachment',
            content: { data: mockBufferData }, // Simulating Buffer serialization
          },
        ],
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const result = await resend.inbound.get(
        '987770eb-185c-4059-ab73-f0faad7c05d3',
      );

      expect(result.data).not.toBeNull();
      expect(result.error).toBeNull();

      if (result.data) {
        expect(result.data.attachments).toBeDefined();
        expect(result.data.attachments).toHaveLength(1);

        const attachment = result.data.attachments?.[0];
        expect(attachment?.filename).toBe('test.txt');
        expect(attachment?.contentType).toBe('text/plain');
        expect(attachment?.size).toBe(5);

        // Verify that content was converted to Buffer
        expect(Buffer.isBuffer(attachment?.content)).toBe(true);
        expect((attachment?.content as Buffer).toString()).toBe('Hello');
      }
    });

    it('gets inbound email with base64 attachment and converts to Buffer', async () => {
      const base64Content = Buffer.from('Hello World').toString('base64');

      const response = {
        object: 'inbound_email',
        id: '987770eb-185c-4059-ab73-f0faad7c05d3',
        to: ['delivered@resend.dev'],
        from: 'sender@example.com',
        subject: 'Test Email with Base64 Attachment',
        html: '<p>Email with base64 attachment</p>',
        text: 'Email with base64 attachment',
        reply_to: null,
        cc: [],
        bcc: [],
        created_at: '2024-09-29T12:00:00.000Z',
        attachments: [
          {
            filename: 'document.pdf',
            contentType: 'application/pdf',
            size: 11,
            content: base64Content,
          },
        ],
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      const result = await resend.inbound.get(
        '987770eb-185c-4059-ab73-f0faad7c05d3',
      );

      expect(result.data).not.toBeNull();
      expect(result.error).toBeNull();

      if (result.data) {
        expect(result.data.attachments).toBeDefined();
        expect(result.data.attachments).toHaveLength(1);

        const attachment = result.data.attachments?.[0];
        expect(attachment?.filename).toBe('document.pdf');
        expect(attachment?.contentType).toBe('application/pdf');

        // Verify that base64 content was converted to Buffer
        expect(Buffer.isBuffer(attachment?.content)).toBe(true);
        expect((attachment?.content as Buffer).toString()).toBe('Hello World');
      }
    });

    it('gets inbound email with multiple recipients', async () => {
      const response: GetInboundEmailResponseSuccess = {
        object: 'inbound_email',
        id: '987770eb-185c-4059-ab73-f0faad7c05d3',
        to: ['user1@resend.dev', 'user2@resend.dev'],
        from: 'sender@example.com',
        subject: 'Multiple Recipients',
        html: '<p>Hello Multiple Recipients</p>',
        text: 'Hello Multiple Recipients',
        reply_to: ['reply@example.com'],
        cc: ['cc@example.com'],
        bcc: ['bcc@example.com'],
        created_at: '2024-09-29T12:00:00.000Z',
        attachments: null,
      };

      fetchMock.mockOnce(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer re_924b3rjh2387fbewf823',
        },
      });

      await expect(
        resend.inbound.get('987770eb-185c-4059-ab73-f0faad7c05d3'),
      ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "attachments": null,
    "bcc": [
      "bcc@example.com",
    ],
    "cc": [
      "cc@example.com",
    ],
    "created_at": "2024-09-29T12:00:00.000Z",
    "from": "sender@example.com",
    "html": "<p>Hello Multiple Recipients</p>",
    "id": "987770eb-185c-4059-ab73-f0faad7c05d3",
    "object": "inbound_email",
    "reply_to": [
      "reply@example.com",
    ],
    "subject": "Multiple Recipients",
    "text": "Hello Multiple Recipients",
    "to": [
      "user1@resend.dev",
      "user2@resend.dev",
    ],
  },
  "error": null,
}
`);
    });
  });
});
