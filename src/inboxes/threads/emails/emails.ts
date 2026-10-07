import type { RequestOptions } from '../../../common/interfaces/request-options.interface';
import { buildPaginationUrl } from '../../../common/utils/build-pagination-query';
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
  ListInboxThreadEmailsOptions,
  ListInboxThreadEmailsResponse,
  ListInboxThreadEmailsResponseSuccess,
} from '../interfaces/list-inbox-thread-emails.interface';
import type {
  ReplyInboxThreadEmailOptions,
  ReplyInboxThreadEmailRequestOptions,
  ReplyInboxThreadEmailResponse,
  ReplyInboxThreadEmailResponseSuccess,
} from '../interfaces/reply-inbox-thread-email.interface';

export class InboxThreadEmails {
  constructor(private readonly resend: Resend) {}

  async list(
    options: ListInboxThreadEmailsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<ListInboxThreadEmailsResponse> {
    const { inboxId, threadId, ...pagination } = options;
    const url = buildPaginationUrl(
      `/inboxes/${inboxId}/threads/${threadId}/emails`,
      pagination,
    );
    return this.resend.get<ListInboxThreadEmailsResponseSuccess>(
      url,
      requestOptions,
    );
  }

  async get(
    options: GetInboxThreadEmailOptions,
    requestOptions: RequestOptions = {},
  ): Promise<GetInboxThreadEmailResponse> {
    const { inboxId, threadId, emailId } = options;
    return this.resend.get<GetInboxThreadEmailResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}`,
      requestOptions,
    );
  }

  async reply(
    payload: ReplyInboxThreadEmailOptions,
    options: ReplyInboxThreadEmailRequestOptions = {},
  ): Promise<ReplyInboxThreadEmailResponse> {
    const {
      inboxId,
      threadId,
      emailId,
      cc,
      bcc,
      html,
      text,
      subject,
      replyAll,
    } = payload;
    return this.resend.post<ReplyInboxThreadEmailResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}/reply`,
      { cc, bcc, html, text, subject, reply_all: replyAll },
      options,
    );
  }

  async forward(
    payload: ForwardInboxThreadEmailOptions,
    options: ForwardInboxThreadEmailRequestOptions = {},
  ): Promise<ForwardInboxThreadEmailResponse> {
    const { inboxId, threadId, emailId, to, cc, bcc, html, text, subject } =
      payload;
    return this.resend.post<ForwardInboxThreadEmailResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}/forward`,
      { to, cc, bcc, html, text, subject },
      options,
    );
  }
}
