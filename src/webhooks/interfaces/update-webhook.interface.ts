import type { Response } from '../../interfaces';
import type { WebhookEvent } from './webhook-event.interface';

export interface UpdateWebhookOptions {
  endpoint?: string;
  events?: WebhookEvent[];
  status?: 'enabled' | 'disabled';
}

export interface UpdateWebhookResponseSuccess {
  object: 'webhook';
  id: string;
}

export type UpdateWebhookResponse = Response<UpdateWebhookResponseSuccess>;
