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

export const INBOX_AGENT_TONE_PRESETS = [
  'concise_professional',
  'concise_casual',
  'expanded_professional',
  'expanded_casual',
] as const;

export type InboxAgentTonePreset = (typeof INBOX_AGENT_TONE_PRESETS)[number];

/**
 * A preset key, or custom text of up to 64 characters written by the
 * inbox owner
 */
export type InboxAgentTone = InboxAgentTonePreset | (string & {});

export interface InboxAgentSettings {
  object: 'inbox_agent';
  instructions: string | null;
  tone: InboxAgentTone | null;
  enabled_actions: InboxAgentAction[];
}
