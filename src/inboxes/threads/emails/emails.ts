import type { Resend } from '../../../resend';
import type {
  ForwardInboxThreadEmailOptions,
  ForwardInboxThreadEmailRequestOptions,
  ForwardInboxThreadEmailResponse,
  ForwardInboxThreadEmailResponseSuccess,
} from '../interfaces/forward-inbox-thread-email.interface';
import type {
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
    inboxId: string,
    threadId: string,
    emailId: string,
  ): Promise<GetInboxThreadEmailResponse> {
    return this.resend.get<GetInboxThreadEmailResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}`,
    );
  }

  async reply(
    inboxId: string,
    threadId: string,
    emailId: string,
    payload: ReplyInboxThreadEmailOptions,
    options: ReplyInboxThreadEmailRequestOptions = {},
  ): Promise<ReplyInboxThreadEmailResponse> {
    return this.resend.post<ReplyInboxThreadEmailResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}/reply`,
      payload,
      options,
    );
  }

  async forward(
    inboxId: string,
    threadId: string,
    emailId: string,
    payload: ForwardInboxThreadEmailOptions,
    options: ForwardInboxThreadEmailRequestOptions = {},
  ): Promise<ForwardInboxThreadEmailResponse> {
    return this.resend.post<ForwardInboxThreadEmailResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}/forward`,
      payload,
      options,
    );
  }
}
