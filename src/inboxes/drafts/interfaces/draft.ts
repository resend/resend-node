export type InboxDraftType = 'standalone' | 'reply';

export interface InboxDraftAttachment {
  id: string;
  filename: string;
  content_type: string;
  size: number;
}

interface InboxDraftContentAttachmentOptions {
  /** Content of the file, as a base64 string or a Buffer. */
  content: string | Buffer;
  path?: never;
  filename: string;
  contentType: string;
}

interface InboxDraftPathAttachmentOptions {
  content?: never;
  /** URL of the file, downloaded when the request is made and stored on the draft. */
  path: string;
  filename: string;
  /** Defaults to the content type of the downloaded file. */
  contentType?: string;
}

export type InboxDraftAttachmentOptions =
  | InboxDraftContentAttachmentOptions
  | InboxDraftPathAttachmentOptions;

export interface InboxDraft {
  object: 'inbox_draft';
  id: string;
  type: InboxDraftType;
  to: string[] | null;
  cc: string[];
  bcc: string[];
  subject: string | null;
  html: string | null;
  text: string | null;
  thread_id: string | null;
  reply_to_email_id: string | null;
  email_id: string | null;
  created_at: string;
  updated_at: string;
  attachments: InboxDraftAttachment[];
}

export interface InboxDraftListItem {
  id: string;
  type: InboxDraftType;
  to: string[] | null;
  cc: string[];
  bcc: string[];
  subject: string | null;
  snippet: string | null;
  thread_id: string | null;
  reply_to_email_id: string | null;
  updated_at: string;
  attachments: InboxDraftAttachment[];
}
