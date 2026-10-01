import type { Response } from '../../interfaces';
import type { WebhookEventLogStatus } from './list-webhook-events.interface';
import type {
  WebhookEvent,
  WebhookEventPayload,
} from './webhook-event.interface';

export interface GetWebhookEventOptions {
  webhookId: string;
  eventId: string;
}

export interface GetWebhookEventResponseSuccess {
  object: 'webhook_event';
  id: string;
  type: WebhookEvent;
  created_at: string;
  status: WebhookEventLogStatus;
  next_attempt_at: string | null;
  payload: WebhookEventPayload;
}

export type GetWebhookEventResponse = Response<GetWebhookEventResponseSuccess>;
