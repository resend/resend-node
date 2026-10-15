import type { RequireAtLeastOne } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxAgentAction, InboxAgentTone } from './agent';

export type UpdateInboxAgentOptions = {
  inboxId: string;
} & RequireAtLeastOne<{
  instructions?: string | null;
  tone?: InboxAgentTone | null;
  actions?: InboxAgentAction[];
}>;

export interface UpdateInboxAgentResponseSuccess {
  object: 'inbox_agent';
  id: string;
}

export type UpdateInboxAgentResponse =
  Response<UpdateInboxAgentResponseSuccess>;
