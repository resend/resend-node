import type { PostOptions } from '../../common/interfaces';
import type { IdempotentRequest } from '../../common/interfaces/idempotent-request.interface';
import type { Response } from '../../interfaces';

export type SendEventOptions =
  | {
      event: string;
      contactId: string;
      email?: never;
      payload?: Record<string, unknown>;
    }
  | {
      event: string;
      email: string;
      contactId?: never;
      payload?: Record<string, unknown>;
    };

export interface SendEventRequestOptions
  extends PostOptions,
    IdempotentRequest {}

export interface SendEventResponseSuccess {
  object: 'event';
  event: string;
}

export type SendEventResponse = Response<SendEventResponseSuccess>;
