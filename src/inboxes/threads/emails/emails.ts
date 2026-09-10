import type { Resend } from '../../../resend';
import type {
  ForwardInboxThreadEmailOptions,
  ForwardInboxThreadEmailRequestOptions,
  ForwardInboxThreadEmailResponse,
  ForwardInboxThreadEmailResponseSuccess,
} from '../interfaces/forward-inbox-thread-email.interface';
import type {
  GetInboxThreadEmailOptions,
  GetInboxThreadEmailResponse,
  GetInboxThreadEmailResponseSuccess,
} from '../interfaces/get-inbox-thread-email.interface';
import type {
  ReplyInboxThreadEmailOptions,
  ReplyInboxThreadEmailRequestOptions,
  ReplyInboxThreadEmailResponse,
  ReplyInboxThreadEmailResponseSuccess,
} from '../interfaces/reply-inbox-thread-email.interface';

export class InboxThreadEmails {
  constructor(private readonly resend: Resend) {}

  async get(
    options: GetInboxThreadEmailOptions,
  ): Promise<GetInboxThreadEmailResponse> {
    const { inboxId, threadId, emailId } = options;
    return this.resend.get<GetInboxThreadEmailResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}`,
    );
  }

  async reply(
    payload: ReplyInboxThreadEmailOptions,
    options: ReplyInboxThreadEmailRequestOptions = {},
  ): Promise<ReplyInboxThreadEmailResponse> {
    const { inboxId, threadId, emailId, html, text, subject } = payload;
    return this.resend.post<ReplyInboxThreadEmailResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}/reply`,
      { html, text, subject },
      options,
    );
  }

  async forward(
    payload: ForwardInboxThreadEmailOptions,
    options: ForwardInboxThreadEmailRequestOptions = {},
  ): Promise<ForwardInboxThreadEmailResponse> {
    const { inboxId, threadId, emailId, to, html, text, subject } = payload;
    return this.resend.post<ForwardInboxThreadEmailResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}/forward`,
      { to, html, text, subject },
      options,
    );
  }
}
