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
 * Hex color in the #RRGGBB format
 *
 * @example '#E93D82'
 */
export type InboxLabelColor = string;

export type InboxSelector =
  | {
      /** The inbox ID. */
      inboxId: string;
      email?: never;
    }
  | {
      inboxId?: never;
      /** The inbox email address, such as `support@example.com`. */
      email: string;
    };

export interface Inbox {
  id: string;
  name: string | null;
  email_address: string;
  from_name: string | null;
  unread: number;
  last_received: string | null;
  created_at: string;
  updated_at: string;
}
