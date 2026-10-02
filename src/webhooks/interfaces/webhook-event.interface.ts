import type { InboxDraft } from '../../inboxes/drafts/interfaces/draft';
import type { GetInboxResponseSuccess } from '../../inboxes/interfaces/get-inbox.interface';
import type { InboxMessageFolder } from '../../inboxes/interfaces/inbox';
import type {
  InboxMessage,
  InboxThreadLabel,
  InboxThreadSummary,
} from '../../inboxes/threads/interfaces/thread';

export type WebhookEvent =
  | 'email.sent'
  | 'email.scheduled'
  | 'email.delivered'
  | 'email.delivery_delayed'
  | 'email.complained'
  | 'email.bounced'
  | 'email.opened'
  | 'email.clicked'
  | 'email.received'
  | 'email.failed'
  | 'email.suppressed'
  | 'contact.created'
  | 'contact.updated'
  | 'contact.deleted'
  | 'contact.topics.updated'
  | 'domain.created'
  | 'domain.updated'
  | 'domain.deleted'
  | 'suppression.added'
  | 'suppression.removed'
  | 'topic.created'
  | 'topic.updated'
  | 'topic.deleted'
  | 'inbox.created'
  | 'inbox.updated'
  | 'inbox.deleted'
  | 'inbox.thread.created'
  | 'inbox.thread.folder.updated'
  | 'inbox.thread.assigned'
  | 'inbox.thread.unassigned'
  | 'inbox.thread.labels.updated'
  | 'inbox.email.received'
  | 'inbox.email.sent'
  | 'inbox.draft.created'
  | 'inbox.draft.updated'
  | 'inbox.draft.sent'
  | 'inbox.draft.deleted';

interface BaseEmailEventData {
  broadcast_id?: string;
  created_at: string;
  email_id: string;
  message_id: string;
  from: string;
  to: string[];
  subject: string;
  template_id?: string;
  tags?: Record<string, string>;
}

interface EmailBounce {
  message: string;
  subType: string;
  type: string;
}

interface EmailClick {
  ipAddress: string;
  link: string;
  timestamp: string;
  userAgent: string;
}

interface EmailFailed {
  reason: string;
}

interface EmailSuppressed {
  message: string;
  type: string;
}

interface ReceivedEmailAttachment {
  id: string;
  filename: string | null;
  content_type: string;
  content_disposition: string | null;
  content_id: string | null;
}

interface ReceivedEmailEventData {
  email_id: string;
  created_at: string;
  from: string;
  to: string[];
  bcc: string[];
  cc: string[];
  received_for: string[];
  message_id: string;
  subject: string;
  attachments: ReceivedEmailAttachment[];
}

interface ContactEventData {
  id: string;
  audience_id: string;
  segment_ids: string[];
  created_at: string;
  updated_at: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  unsubscribed: boolean;
}

interface ContactTopicsEventData {
  email: string;
  topics: {
    id: string;
    subscription: 'opt_in' | 'opt_out';
  }[];
}

interface DomainRecord {
  record: string;
  name: string;
  type: string;
  ttl: string;
  status: string;
  value: string;
  priority?: number;
}

interface DomainEventData {
  id: string;
  name: string;
  status: string;
  created_at: string;
  region: string;
  records: DomainRecord[];
}

interface SuppressionEventData {
  id: string;
  email: string;
  origin: 'bounce' | 'complaint' | 'manual';
  source_id: string | null;
  created_at: string;
}

interface TopicEventData {
  id: string;
  name: string;
  description: string | null;
  default_subscription: 'opt_in' | 'opt_out';
  deleted: boolean;
  created_at: string;
  updated_at: string;
}

interface InboxEventData {
  source: 'api' | 'dashboard' | 'agent' | 'system';
  inbox_id: string;
  thread_id?: string;
  email_id?: string;
  draft_id?: string;
  thread?: InboxThreadSummary;
  email?: Omit<InboxMessage, 'html' | 'text'>;
  draft?: Omit<InboxDraft, 'html' | 'text'>;
  inbox?: GetInboxResponseSuccess;
}

export interface EmailSentEvent {
  type: 'email.sent';
  created_at: string;
  data: BaseEmailEventData;
}

export interface EmailScheduledEvent {
  type: 'email.scheduled';
  created_at: string;
  data: BaseEmailEventData;
}

export interface EmailDeliveredEvent {
  type: 'email.delivered';
  created_at: string;
  data: BaseEmailEventData;
}

export interface EmailDeliveryDelayedEvent {
  type: 'email.delivery_delayed';
  created_at: string;
  data: BaseEmailEventData;
}

export interface EmailComplainedEvent {
  type: 'email.complained';
  created_at: string;
  data: BaseEmailEventData;
}

export interface EmailBouncedEvent {
  type: 'email.bounced';
  created_at: string;
  data: BaseEmailEventData & {
    bounce: EmailBounce;
  };
}

export interface EmailOpenedEvent {
  type: 'email.opened';
  created_at: string;
  data: BaseEmailEventData;
}

export interface EmailClickedEvent {
  type: 'email.clicked';
  created_at: string;
  data: BaseEmailEventData & {
    click: EmailClick;
  };
}

export interface EmailReceivedEvent {
  type: 'email.received';
  created_at: string;
  data: ReceivedEmailEventData;
}

export interface EmailFailedEvent {
  type: 'email.failed';
  created_at: string;
  data: BaseEmailEventData & {
    failed: EmailFailed;
  };
}

export interface EmailSuppressedEvent {
  type: 'email.suppressed';
  created_at: string;
  data: BaseEmailEventData & {
    suppressed: EmailSuppressed;
  };
}

export interface ContactCreatedEvent {
  type: 'contact.created';
  created_at: string;
  data: ContactEventData;
}

export interface ContactUpdatedEvent {
  type: 'contact.updated';
  created_at: string;
  data: ContactEventData;
}

export interface ContactDeletedEvent {
  type: 'contact.deleted';
  created_at: string;
  data: ContactEventData;
}

export interface ContactTopicsUpdatedEvent {
  type: 'contact.topics.updated';
  created_at: string;
  data: ContactTopicsEventData;
}

export interface DomainCreatedEvent {
  type: 'domain.created';
  created_at: string;
  data: DomainEventData;
}

export interface DomainUpdatedEvent {
  type: 'domain.updated';
  created_at: string;
  data: DomainEventData;
}

export interface DomainDeletedEvent {
  type: 'domain.deleted';
  created_at: string;
  data: DomainEventData;
}

export interface SuppressionAddedEvent {
  type: 'suppression.added';
  created_at: string;
  data: SuppressionEventData;
}

export interface SuppressionRemovedEvent {
  type: 'suppression.removed';
  created_at: string;
  data: SuppressionEventData;
}

export interface TopicCreatedEvent {
  type: 'topic.created';
  created_at: string;
  data: TopicEventData;
}

export interface TopicUpdatedEvent {
  type: 'topic.updated';
  created_at: string;
  data: TopicEventData;
}

export interface TopicDeletedEvent {
  type: 'topic.deleted';
  created_at: string;
  data: TopicEventData;
}

export interface InboxCreatedEvent {
  type: 'inbox.created';
  created_at: string;
  data: InboxEventData;
}

export interface InboxUpdatedEvent {
  type: 'inbox.updated';
  created_at: string;
  data: InboxEventData;
}

export interface InboxDeletedEvent {
  type: 'inbox.deleted';
  created_at: string;
  data: InboxEventData;
}

export interface InboxThreadCreatedEvent {
  type: 'inbox.thread.created';
  created_at: string;
  data: InboxEventData;
}

export interface InboxThreadFolderUpdatedEvent {
  type: 'inbox.thread.folder.updated';
  created_at: string;
  data: InboxEventData & {
    from: InboxMessageFolder;
    to: InboxMessageFolder;
  };
}

export interface InboxThreadAssignedEvent {
  type: 'inbox.thread.assigned';
  created_at: string;
  data: InboxEventData & {
    assignee_email: string | null;
    assigned_by_email: string | null;
    previous_assignee_email: string | null;
  };
}

export interface InboxThreadUnassignedEvent {
  type: 'inbox.thread.unassigned';
  created_at: string;
  data: InboxEventData & {
    previous_assignee_email: string | null;
  };
}

export interface InboxThreadLabelsUpdatedEvent {
  type: 'inbox.thread.labels.updated';
  created_at: string;
  data: InboxEventData & {
    added: InboxThreadLabel[];
    removed: InboxThreadLabel[];
  };
}

export interface InboxEmailReceivedEvent {
  type: 'inbox.email.received';
  created_at: string;
  data: InboxEventData;
}

export interface InboxEmailSentEvent {
  type: 'inbox.email.sent';
  created_at: string;
  data: InboxEventData;
}

export interface InboxDraftCreatedEvent {
  type: 'inbox.draft.created';
  created_at: string;
  data: InboxEventData;
}

export interface InboxDraftUpdatedEvent {
  type: 'inbox.draft.updated';
  created_at: string;
  data: InboxEventData;
}

export interface InboxDraftSentEvent {
  type: 'inbox.draft.sent';
  created_at: string;
  data: InboxEventData;
}

export interface InboxDraftDeletedEvent {
  type: 'inbox.draft.deleted';
  created_at: string;
  data: InboxEventData;
}

export type WebhookEventPayload =
  | EmailSentEvent
  | EmailScheduledEvent
  | EmailDeliveredEvent
  | EmailDeliveryDelayedEvent
  | EmailComplainedEvent
  | EmailBouncedEvent
  | EmailOpenedEvent
  | EmailClickedEvent
  | EmailReceivedEvent
  | EmailFailedEvent
  | EmailSuppressedEvent
  | ContactCreatedEvent
  | ContactUpdatedEvent
  | ContactDeletedEvent
  | ContactTopicsUpdatedEvent
  | DomainCreatedEvent
  | DomainUpdatedEvent
  | DomainDeletedEvent
  | SuppressionAddedEvent
  | SuppressionRemovedEvent
  | TopicCreatedEvent
  | TopicUpdatedEvent
  | TopicDeletedEvent
  | InboxCreatedEvent
  | InboxUpdatedEvent
  | InboxDeletedEvent
  | InboxThreadCreatedEvent
  | InboxThreadFolderUpdatedEvent
  | InboxThreadAssignedEvent
  | InboxThreadUnassignedEvent
  | InboxThreadLabelsUpdatedEvent
  | InboxEmailReceivedEvent
  | InboxEmailSentEvent
  | InboxDraftCreatedEvent
  | InboxDraftUpdatedEvent
  | InboxDraftSentEvent
  | InboxDraftDeletedEvent;
