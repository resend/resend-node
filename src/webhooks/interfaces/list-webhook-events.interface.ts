import type { Response } from '../../interfaces';

export type WebhookEventLogStatus =
  | 'success'
  | 'pending'
  | 'failed'
  | 'attempting';

export interface WebhookEventLog {
  id: string;
  type: string;
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
