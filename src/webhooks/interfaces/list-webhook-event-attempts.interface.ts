import type { Response } from '../../interfaces';

export interface WebhookEventAttempt {
  id: string;
  http_status_code: number;
  response: string;
  sent_at: string;
}

export type ListWebhookEventAttemptsOptions = {
  webhookId: string;
  eventId: string;
  limit?: number;
  after?: string;
};

export type ListWebhookEventAttemptsResponseSuccess = {
  object: 'list';
  has_more: boolean;
  data: WebhookEventAttempt[];
};

export type ListWebhookEventAttemptsResponse =
  Response<ListWebhookEventAttemptsResponseSuccess>;
