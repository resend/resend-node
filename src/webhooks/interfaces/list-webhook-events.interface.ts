import type { Response } from '../../interfaces';
import type { WebhookEvent } from './webhook-event.interface';

export type WebhookEventLogStatus =
  | 'success'
  | 'pending'
  | 'failed'
  | 'attempting';

export interface WebhookEventLog {
  id: string;
  type: WebhookEvent;
  created_at: string;
  status: WebhookEventLogStatus;
}

export type ListWebhookEventsOptions = {
  webhookId: string;
  limit?: number;
  after?: string;
};

export type ListWebhookEventsResponseSuccess = {
  object: 'list';
  has_more: boolean;
  data: WebhookEventLog[];
};

export type ListWebhookEventsResponse =
  Response<ListWebhookEventsResponseSuccess>;
