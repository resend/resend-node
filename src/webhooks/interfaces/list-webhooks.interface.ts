import type { PaginationOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';

export type ListWebhooksOptions = PaginationOptions;

export interface Webhook {
  id: string;
  endpoint: string;
  created_at: string;
  status: 'enabled' | 'disabled';
  events: string[] | null;
}

export type ListWebhooksResponseSuccess = {
  object: 'list';
  has_more: boolean;
  data: Webhook[];
};

export type ListWebhooksResponse =
  | {
      data: ListWebhooksResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
