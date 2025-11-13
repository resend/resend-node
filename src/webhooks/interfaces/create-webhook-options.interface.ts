import type { PostOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { WebhookEvent } from './webhook-event.interface';

export interface CreateWebhookOptions {
  endpoint: string;
  events: WebhookEvent[];
}

export interface CreateWebhookRequestOptions extends PostOptions {}

export interface CreateWebhookResponseSuccess {
  object: 'webhook';
  id: string;
  signing_secret: string;
}

export type CreateWebhookResponse = Response<CreateWebhookResponseSuccess>;
