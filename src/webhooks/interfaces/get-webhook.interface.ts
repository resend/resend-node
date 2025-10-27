import type { Response } from '../../interfaces';
import type { WebhookEvent } from './webhook-event.interface';

export interface GetWebhookResponseSuccess {
  object: 'webhook';
  id: string;
  created_at: string;
  status: 'enabled' | 'disabled';
  endpoint: string;
  events: WebhookEvent[] | null;
  signing_secret: string;
}

export type GetWebhookResponse = Response<GetWebhookResponseSuccess>;
