import type { Response } from '../../interfaces';
import type { Webhook } from './list-webhooks.interface';

export type RemoveWebhookResponseSuccess = Pick<Webhook, 'id'> & {
  object: 'webhook';
  deleted: boolean;
};

export type RemoveWebhookResponse = Response<RemoveWebhookResponseSuccess>;
