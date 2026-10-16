import type { RequestOptions } from '../../common/interfaces/request-options.interface';
import type { Resend } from '../../resend';
import { buildInboxPath, missingInboxError } from '../build-inbox-path';
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
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    return this.resend.get<GetInboxAgentResponseSuccess>(
      `${inboxPath}/agent`,
      requestOptions,
    );
  }

  async update(
    options: UpdateInboxAgentOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateInboxAgentResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    const { instructions, tone, actions } = options;
    return this.resend.patch<UpdateInboxAgentResponseSuccess>(
      `${inboxPath}/agent`,
      { instructions, tone, actions },
      requestOptions,
    );
  }
}
