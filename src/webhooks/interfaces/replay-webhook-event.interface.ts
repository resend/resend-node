import type { Response } from '../../interfaces';

export interface ReplayWebhookEventOptions {
  webhookId: string;
  eventId: string;
}

export interface ReplayWebhookEventResponseSuccess {
  object: 'webhook_event';
  id: string;
}

export type ReplayWebhookEventResponse =
  Response<ReplayWebhookEventResponseSuccess>;
