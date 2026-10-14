export const INBOX_MESSAGE_FOLDERS = [
  'inbox',
  'archive',
  'spam',
  'sent',
  'trash',
] as const;

export type InboxMessageFolder = (typeof INBOX_MESSAGE_FOLDERS)[number];

export const MOVE_THREAD_FOLDERS = [
  'inbox',
  'archive',
  'spam',
  'trash',
] as const;

export type MoveThreadFolder = (typeof MOVE_THREAD_FOLDERS)[number];

/**
 * Hex color like #E93D82
 *
 * The API validates the format and rejects anything else with a 422
 */
export type InboxLabelColor = string;

export interface Inbox {
  id: string;
  name: string | null;
  email_address: string;
  from_name: string | null;
  unread: number;
  last_received: string | null;
}
