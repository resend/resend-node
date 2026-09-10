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

export const INBOX_LABEL_COLORS = [
  'cyan',
  'teal',
  'grass',
  'lime',
  'yellow',
  'orange',
  'iris',
  'plum',
  'crimson',
  'bronze',
  'mauve',
] as const;

export type InboxLabelColor = (typeof INBOX_LABEL_COLORS)[number];

export interface Inbox {
  id: string;
  name: string | null;
  email_address: string;
  friendly_name: string | null;
  unread: number;
  last_received: string | null;
}
