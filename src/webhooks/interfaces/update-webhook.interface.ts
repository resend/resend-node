import type { ErrorResponse } from '../../interfaces';

export interface UpdateWebhookOptions {
  endpoint?: string;
  events?: string[];
  status?: 'enabled' | 'disabled';
}

export interface UpdateWebhookResponseSuccess {
  object: 'webhook';
  id: string;
}

export type UpdateWebhookResponse =
  | {
      data: UpdateWebhookResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
