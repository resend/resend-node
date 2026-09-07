import type {
  InboxLabelColor,
  InboxMessageFolder,
} from '../../interfaces/inbox';

export interface InboxThreadLabel {
  id: string;
  name: string;
  color: InboxLabelColor;
}

export interface InboxThread {
  id: string;
  subject: string | null;
  from: string | null;
  to: string[];
  cc: string[];
  bcc: string[];
  labels: InboxThreadLabel[];
  message_count: number;
  has_attachment: boolean;
  has_draft: boolean;
  read: boolean;
  received_at: string;
}

export interface InboxThreadSummary {
  object: 'inbox_thread';
  id: string;
  subject: string | null;
  folder: InboxMessageFolder;
  labels: InboxThreadLabel[];
  read: boolean;
}

export interface InboxMessageAttachment {
  id: string;
  filename: string | null;
  size: number | null;
}

export interface InboxMessage {
  id: string;
  direction: 'inbound' | 'outbound';
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  reply_to: string[];
  subject: string | null;
  message_id: string | null;
  html: string | null;
  text: string | null;
  attachments: InboxMessageAttachment[];
  read: boolean;
  received_at: string;
}
