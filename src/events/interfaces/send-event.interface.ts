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

export interface SendEventResponseSuccess {
  object: 'workflow_event';
  event: string;
  event_instance_id: string;
}

export type SendEventResponse = Response<SendEventResponseSuccess>;
