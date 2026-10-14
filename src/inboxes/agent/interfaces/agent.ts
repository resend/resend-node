export const INBOX_AGENT_ACTIONS = [
  'draft_reply',
  'forward_thread',
  'add_labels',
  'assign_thread',
  'mark_as_spam',
  'archive_thread',
  'delete_thread',
] as const;

export type InboxAgentAction = (typeof INBOX_AGENT_ACTIONS)[number];

export interface InboxAgentSettings {
  object: 'inbox_agent';
  instructions: string | null;
  tone: string | null;
  enabled_actions: InboxAgentAction[];
}
