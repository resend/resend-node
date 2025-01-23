import type { CreateEmailOptions } from '../../emails/interfaces/create-email-options.interface';
import { parseEmailToApiOptions } from './parse-email-to-api-options';

describe('parseEmailToAPIOptions', () => {
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
});
