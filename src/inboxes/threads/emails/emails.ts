import type { RequestOptions } from '../../../common/interfaces/request-options.interface';
import { buildPaginationUrl } from '../../../common/utils/build-pagination-query';
import { parseAttachments } from '../../../common/utils/parse-email-to-api-options';
import type { Resend } from '../../../resend';
import { buildInboxPath, missingInboxError } from '../../build-inbox-path';
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
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    const { inboxId, email, threadId, ...pagination } = options;
    const url = buildPaginationUrl(
      `${inboxPath}/threads/${threadId}/emails`,
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
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    const { threadId, emailId } = options;
    return this.resend.get<GetInboxThreadEmailResponseSuccess>(
      `${inboxPath}/threads/${threadId}/emails/${emailId}`,
      requestOptions,
    );
  }

  async reply(
    payload: ReplyInboxThreadEmailOptions,
    options: ReplyInboxThreadEmailRequestOptions = {},
  ): Promise<ReplyInboxThreadEmailResponse> {
    const inboxPath = buildInboxPath(payload);
    if (!inboxPath) {
      return missingInboxError();
    }

    const {
      threadId,
      emailId,
      cc,
      bcc,
      html,
      text,
      subject,
      replyAll,
      attachments,
      headers,
    } = payload;
    return this.resend.post<ReplyInboxThreadEmailResponseSuccess>(
      `${inboxPath}/threads/${threadId}/emails/${emailId}/reply`,
      {
        cc,
        bcc,
        html,
        text,
        subject,
        reply_all: replyAll,
        attachments: parseAttachments(attachments),
        headers,
      },
      options,
    );
  }

  async forward(
    payload: ForwardInboxThreadEmailOptions,
    options: ForwardInboxThreadEmailRequestOptions = {},
  ): Promise<ForwardInboxThreadEmailResponse> {
    const inboxPath = buildInboxPath(payload);
    if (!inboxPath) {
      return missingInboxError();
    }

    const {
      threadId,
      emailId,
      to,
      cc,
      bcc,
      html,
      text,
      subject,
      attachments,
      headers,
    } = payload;
    return this.resend.post<ForwardInboxThreadEmailResponseSuccess>(
      `${inboxPath}/threads/${threadId}/emails/${emailId}/forward`,
      {
        to,
        cc,
        bcc,
        html,
        text,
        subject,
        attachments: parseAttachments(attachments),
        headers,
      },
      options,
    );
  }
}
