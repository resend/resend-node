import type { RequireAtLeastOne } from '../../../common/interfaces';
import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxAgentAction, InboxAgentTone } from './agent';

export type UpdateInboxAgentOptions = InboxSelector &
  RequireAtLeastOne<{
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
