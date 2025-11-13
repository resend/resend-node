import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { WebhookEvent } from './webhook-event.interface';

export type ListWebhooksOptions = PaginationOptions;

export interface Webhook {
  id: string;
  endpoint: string;
  created_at: string;
  status: 'enabled' | 'disabled';
  events: WebhookEvent[] | null;
}

export type ListWebhooksResponseSuccess = {
  object: 'list';
  has_more: boolean;
  data: Webhook[];
};

export type ListWebhooksResponse = Response<ListWebhooksResponseSuccess>;
