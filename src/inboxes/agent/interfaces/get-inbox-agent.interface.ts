import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';
import type { InboxAgentSettings } from './agent';

export type GetInboxAgentOptions = InboxSelector;

export type GetInboxAgentResponseSuccess = InboxAgentSettings;

export type GetInboxAgentResponse = Response<GetInboxAgentResponseSuccess>;
