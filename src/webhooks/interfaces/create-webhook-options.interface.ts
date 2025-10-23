import type { PostOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';

export interface CreateWebhookOptions {
  endpoint: string;
  events: string[];
}

export interface CreateWebhookRequestOptions extends PostOptions {}

export interface CreateWebhookResponseSuccess {
  object: 'webhook';
  id: string;
  signing_secret: string;
}

export type CreateWebhookResponse =
  | {
      data: CreateWebhookResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
