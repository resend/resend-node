export type WebhookEvent =
  | 'email.sent'
  | 'email.delivered'
  | 'email.delivery_delayed'
  | 'email.complained'
  | 'email.bounced'
  | 'email.opened'
  | 'email.clicked'
  | 'email.received'
  | 'email.failed'
  | 'contact.created'
  | 'contact.updated'
  | 'contact.deleted'
  | 'domain.created'
  | 'domain.updated'
  | 'domain.deleted';

interface BaseEmailEventData {
  broadcast_id?: string;
  created_at: string;
  email_id: string;
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

interface ReceivedEmailAttachment {
  id: string;
  filename: string;
  content_type: string;
  content_disposition: string;
  content_id?: string;
}

interface ReceivedEmailEventData {
  email_id: string;
  created_at: string;
  from: string;
  to: string[];
  bcc: string[];
  cc: string[];
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
  first_name?: string;
  last_name?: string;
  unsubscribed: boolean;
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

export interface EmailSentEvent {
  type: 'email.sent';
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

export type WebhookEventPayload =
  | EmailSentEvent
  | EmailDeliveredEvent
  | EmailDeliveryDelayedEvent
  | EmailComplainedEvent
  | EmailBouncedEvent
  | EmailOpenedEvent
  | EmailClickedEvent
  | EmailReceivedEvent
  | EmailFailedEvent
  | ContactCreatedEvent
  | ContactUpdatedEvent
  | ContactDeletedEvent
  | DomainCreatedEvent
  | DomainUpdatedEvent
  | DomainDeletedEvent;
