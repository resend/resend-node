import type { CreateEmailOptions } from '../../emails/interfaces/create-email-options.interface';
import type {
  EmailApiAttachment,
  EmailApiOptions,
} from '../interfaces/email-api-options.interface';

function parseAttachments(
  attachments: CreateEmailOptions['attachments'],
): EmailApiAttachment[] | undefined {
  return attachments?.map((attachment) => ({
    content: attachment.content,
    filename: attachment.filename,
    path: attachment.path,
    content_type: attachment.contentType,
    content_id: attachment.contentId,
  }));
}

export function parseEmailToApiOptions(
  email: CreateEmailOptions,
): EmailApiOptions {
  return {
    attachments: parseAttachments(email.attachments),
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
