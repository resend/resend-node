import type { RequestOptions } from '../../common/interfaces/request-options.interface';
import type { Resend } from '../../resend';
import type {
  GetInboxAgentOptions,
  GetInboxAgentResponse,
  GetInboxAgentResponseSuccess,
} from './interfaces/get-inbox-agent.interface';
import type {
  UpdateInboxAgentOptions,
  UpdateInboxAgentResponse,
  UpdateInboxAgentResponseSuccess,
} from './interfaces/update-inbox-agent.interface';

export class InboxAgent {
  constructor(private readonly resend: Resend) {}

  async get(
    options: GetInboxAgentOptions,
    requestOptions: RequestOptions = {},
  ): Promise<GetInboxAgentResponse> {
    return this.resend.get<GetInboxAgentResponseSuccess>(
      `/inboxes/${options.inboxId}/agent`,
      requestOptions,
    );
  }

  async update(
    options: UpdateInboxAgentOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateInboxAgentResponse> {
    const { inboxId, instructions, tone, enabledActions } = options;
    return this.resend.patch<UpdateInboxAgentResponseSuccess>(
      `/inboxes/${inboxId}/agent`,
      { instructions, tone, enabled_actions: enabledActions },
      requestOptions,
    );
  }
}
