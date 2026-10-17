import type {
  Attachment,
  CreateEmailOptions,
} from '../../emails/interfaces/create-email-options.interface';
import type {
  EmailApiAttachment,
  EmailApiOptions,
} from '../interfaces/email-api-options.interface';

function encodeBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(
      bytes.buffer,
      bytes.byteOffset,
      bytes.byteLength,
    ).toString('base64');
  }

  // Chunked so the spread stays below the engine's argument limit
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

/**
 * JSON.stringify turns a Uint8Array into an object of indexes and an
 * ArrayBuffer into `{}`, so binary content is sent as base64 instead.
 */
function parseAttachmentContent(
  content: Attachment['content'],
): string | undefined {
  if (ArrayBuffer.isView(content)) {
    return encodeBase64(
      new Uint8Array(content.buffer, content.byteOffset, content.byteLength),
    );
  }
  if (content instanceof ArrayBuffer) {
    return encodeBase64(new Uint8Array(content));
  }
  return content;
}

export function parseAttachments(
  attachments: CreateEmailOptions['attachments'],
): EmailApiAttachment[] | undefined {
  return attachments?.map((attachment) => ({
    content: parseAttachmentContent(attachment.content),
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
    template: email.template
      ? {
          id: email.template.id,
          variables: email.template.variables,
        }
      : undefined,
    topic_id: email.topicId,
  };
}
