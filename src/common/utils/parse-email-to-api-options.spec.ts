import type { CreateEmailOptions } from '../../emails/interfaces/create-email-options.interface';
import {
  parseAttachments,
  parseEmailToApiOptions,
} from './parse-email-to-api-options';

describe('parseEmailToApiOptions', () => {
  it('handles minimal email with only required fields', () => {
    const emailPayload: CreateEmailOptions = {
      from: 'joao@resend.com',
      to: 'bu@resend.com',
      subject: 'Hey, there!',
      html: '<h1>Hey, there!</h1>',
    };

    const apiOptions = parseEmailToApiOptions(emailPayload);

    expect(apiOptions).toEqual({
      from: 'joao@resend.com',
      to: 'bu@resend.com',
      subject: 'Hey, there!',
      html: '<h1>Hey, there!</h1>',
    });
  });

  it('parses camel case to snake case', () => {
    const emailPayload: CreateEmailOptions = {
      from: 'joao@resend.com',
      to: 'bu@resend.com',
      subject: 'Hey, there!',
      html: '<h1>Hey, there!</h1>',
      replyTo: 'zeno@resend.com',
      scheduledAt: 'in 1 min',
    };

    const apiOptions = parseEmailToApiOptions(emailPayload);

    expect(apiOptions).toEqual({
      from: 'joao@resend.com',
      to: 'bu@resend.com',
      subject: 'Hey, there!',
      html: '<h1>Hey, there!</h1>',
      reply_to: 'zeno@resend.com',
      scheduled_at: 'in 1 min',
    });
  });

  it('handles template email with template id only', () => {
    const emailPayload: CreateEmailOptions = {
      template: {
        id: 'welcome-template-123',
      },
      to: 'user@example.com',
    };

    const apiOptions = parseEmailToApiOptions(emailPayload);

    expect(apiOptions).toEqual({
      attachments: undefined,
      bcc: undefined,
      cc: undefined,
      from: undefined,
      headers: undefined,
      html: undefined,
      reply_to: undefined,
      scheduled_at: undefined,
      subject: undefined,
      tags: undefined,
      text: undefined,
      to: 'user@example.com',
      template: {
        id: 'welcome-template-123',
      },
    });
  });

  it('handles template email with template id and variables', () => {
    const emailPayload: CreateEmailOptions = {
      template: {
        id: 'newsletter-template-456',
        variables: {
          name: 'John Doe',
          company: 'Acme Corp',
          count: 42,
          isPremium: 'true',
        },
      },
      to: 'user@example.com',
      from: 'sender@example.com',
      subject: 'Custom Subject',
    };

    const apiOptions = parseEmailToApiOptions(emailPayload);

    expect(apiOptions).toEqual({
      attachments: undefined,
      bcc: undefined,
      cc: undefined,
      from: 'sender@example.com',
      headers: undefined,
      html: undefined,
      reply_to: undefined,
      scheduled_at: undefined,
      subject: 'Custom Subject',
      tags: undefined,
      text: undefined,
      to: 'user@example.com',
      template: {
        id: 'newsletter-template-456',
        variables: {
          name: 'John Doe',
          company: 'Acme Corp',
          count: 42,
          isPremium: 'true',
        },
      },
    });
  });

  it('does not include html/text fields for template emails', () => {
    const emailPayload: CreateEmailOptions = {
      template: {
        id: 'test-template-789',
        variables: { message: 'Hello World' },
      },
      to: 'user@example.com',
    };

    const apiOptions = parseEmailToApiOptions(emailPayload);

    // Verify template fields are present
    expect(apiOptions.template).toEqual({
      id: 'test-template-789',
      variables: { message: 'Hello World' },
    });

    // Verify content fields are undefined
    expect(apiOptions.html).toBeUndefined();
    expect(apiOptions.text).toBeUndefined();
  });

  it('does not include template fields for content emails', () => {
    const emailPayload: CreateEmailOptions = {
      from: 'sender@example.com',
      to: 'user@example.com',
      subject: 'Test Email',
      html: '<h1>Hello World</h1>',
      text: 'Hello World',
    };

    const apiOptions = parseEmailToApiOptions(emailPayload);

    // Verify content fields are present
    expect(apiOptions.html).toBe('<h1>Hello World</h1>');
    expect(apiOptions.text).toBe('Hello World');

    // Verify template fields are undefined
    expect(apiOptions.template).toBeUndefined();
  });
});

describe('parseAttachments', () => {
  // '%PDF-1.4'
  const pdfBytes = [0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34];
  const pdfBase64 = 'JVBERi0xLjQ=';

  afterEach(() => vi.unstubAllGlobals());

  it('keeps base64 string content as is', () => {
    expect(
      parseAttachments([{ filename: 'invoice.pdf', content: pdfBase64 }]),
    ).toEqual([{ filename: 'invoice.pdf', content: pdfBase64 }]);
  });

  it.each([
    ['a Buffer', () => Buffer.from(pdfBytes)],
    ['a Uint8Array', () => new Uint8Array(pdfBytes)],
    ['an ArrayBuffer', () => new Uint8Array(pdfBytes).buffer],
  ])('encodes %s as base64', (_, content) => {
    expect(
      parseAttachments([{ filename: 'invoice.pdf', content: content() }]),
    ).toEqual([{ filename: 'invoice.pdf', content: pdfBase64 }]);
  });

  it('encodes only the bytes of a Uint8Array view', () => {
    const buffer = new Uint8Array([0xff, ...pdfBytes, 0xff]).buffer;
    const content = new Uint8Array(buffer, 1, pdfBytes.length);

    expect(parseAttachments([{ content }])?.[0].content).toBe(pdfBase64);
  });

  it('encodes empty binary content as an empty string', () => {
    expect(parseAttachments([{ content: new Uint8Array() }])?.[0].content).toBe(
      '',
    );
  });

  it('encodes binary content when Buffer is not available', () => {
    // Every byte value, longer than one chunk of the btoa fallback
    const bytes = new Uint8Array(100_000).map((_, i) => i % 256);
    const expected = Buffer.from(bytes).toString('base64');
    vi.stubGlobal('Buffer', undefined);

    expect(parseAttachments([{ content: bytes }])?.[0].content).toBe(expected);
  });

  it('maps every attachment and keeps its other fields', () => {
    expect(
      parseAttachments([
        {
          filename: 'invoice.pdf',
          content: new Uint8Array(pdfBytes),
          contentType: 'application/pdf',
        },
        {
          filename: 'logo.png',
          content: 'iVBORw0KGgo=',
          contentId: 'logo',
        },
        { filename: 'terms.pdf', path: 'https://example.com/terms.pdf' },
      ]),
    ).toEqual([
      {
        filename: 'invoice.pdf',
        content: pdfBase64,
        content_type: 'application/pdf',
      },
      { filename: 'logo.png', content: 'iVBORw0KGgo=', content_id: 'logo' },
      { filename: 'terms.pdf', path: 'https://example.com/terms.pdf' },
    ]);
  });
});
