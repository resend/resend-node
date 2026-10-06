import type { Response } from '../../../interfaces';
import type { InboxAgentSettings } from './agent';

export interface GetInboxAgentOptions {
  inboxId: string;
}

export type GetInboxAgentResponseSuccess = InboxAgentSettings;

export type GetInboxAgentResponse = Response<GetInboxAgentResponseSuccess>;
