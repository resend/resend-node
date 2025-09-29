import type { CreateEmailOptions } from '../../emails/interfaces/create-email-options.interface';
import { parseEmailToApiOptions } from './parse-email-to-api-options';

describe('parseEmailToApiOptions', () => {
  it('should handle minimal email with only required fields', () => {
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

  it('should properly parse camel case to snake case', () => {
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

  it('should handle template email with template id only', () => {
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

  it('should handle template email with template id and variables', () => {
    const emailPayload: CreateEmailOptions = {
      template: {
        id: 'newsletter-template-456',
        variables: {
          name: 'John Doe',
          company: 'Acme Corp',
          count: 42,
          isPremium: true,
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
          isPremium: true,
        },
      },
    });
  });

  it('should not include html/text fields for template emails', () => {
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

  it('should not include template fields for content emails', () => {
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
