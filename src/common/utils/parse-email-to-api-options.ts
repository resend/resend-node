import type { CreateEmailOptions } from '../../emails/interfaces/create-email-options.interface';
import type { EmailAPIOptions } from '../interfaces/email-api-options.interface';

export function parseEmailToAPIOptions(
  email: CreateEmailOptions,
): EmailAPIOptions {
  return {
    attachments: email.attachments,
    bcc: email.bcc,
    cc: email.cc,
    from: email.from,
    headers: email.headers,
    html: email.html,
    reply_to: email.replyTo,
    scheduled_at: email.scheduledAt,
    subject: email.subject,
    tags: email.tags,
    text: email.text,
    to: email.to,
  };
}
