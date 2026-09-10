export type InboxDraftType = 'standalone' | 'reply';

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
}
