import type { ErrorResponse } from '../../interfaces';

export interface GetWebhookResponseSuccess {
  object: 'webhook';
  id: string;
  created_at: string;
  status: string;
  endpoint: string;
  events: string[] | null;
  signing_secret: string;
}

export type GetWebhookResponse =
  | {
      data: GetWebhookResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
