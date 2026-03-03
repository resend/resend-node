import type { Response } from '../../interfaces';

export type CreateWorkflowEventOptions =
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

export interface CreateWorkflowEventResponseSuccess {
  object: 'workflow_event';
  event: string;
  event_instance_id: string;
}

export type CreateWorkflowEventResponse =
  Response<CreateWorkflowEventResponseSuccess>;
