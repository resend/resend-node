import type { Response } from '../../interfaces';
import type { WebhookEventLogStatus } from './list-webhook-events.interface';

export interface GetWebhookEventOptions {
  webhookId: string;
  eventId: string;
}

export interface GetWebhookEventResponseSuccess {
  object: 'webhook_event';
  id: string;
  type: string;
  created_at: string;
  status: WebhookEventLogStatus;
  next_attempt_at: string | null;
  payload: unknown;
}

export type GetWebhookEventResponse = Response<GetWebhookEventResponseSuccess>;
