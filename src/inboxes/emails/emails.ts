import type { RequestOptions } from '../../common/interfaces/request-options.interface';
import { buildPaginationUrl } from '../../common/utils/build-pagination-query';
import { parseAttachments } from '../../common/utils/parse-email-to-api-options';
import type { Resend } from '../../resend';
import type {
  ForwardInboxEmailOptions,
  ForwardInboxEmailRequestOptions,
  ForwardInboxEmailResponse,
  ForwardInboxEmailResponseSuccess,
} from './interfaces/forward-inbox-email.interface';
import type {
  GetInboxEmailOptions,
  GetInboxEmailResponse,
  GetInboxEmailResponseSuccess,
} from './interfaces/get-inbox-email.interface';
import type {
  ListInboxEmailsOptions,
  ListInboxEmailsResponse,
  ListInboxEmailsResponseSuccess,
} from './interfaces/list-inbox-emails.interface';
import type {
  ReplyInboxEmailOptions,
  ReplyInboxEmailRequestOptions,
  ReplyInboxEmailResponse,
  ReplyInboxEmailResponseSuccess,
} from './interfaces/reply-inbox-email.interface';

export class InboxEmails {
  constructor(private readonly resend: Resend) {}

  async list(
    options: ListInboxEmailsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<ListInboxEmailsResponse> {
    const { inboxId,  ...pagination } = options;
    const url = buildPaginationUrl(
      `/inboxes/${inboxId}/emails`,
      pagination,
    );
    return this.resend.get<ListInboxEmailsResponseSuccess>(
      url,
      requestOptions,
    );
  }

  async get(
    options: GetInboxEmailOptions,
    requestOptions: RequestOptions = {},
  ): Promise<GetInboxEmailResponse> {
    const { inboxId,  emailId } = options;
    return this.resend.get<GetInboxEmailResponseSuccess>(
      `/inboxes/${inboxId}/emails/${emailId}`,
      requestOptions,
    );
  }

  async reply(
    payload: ReplyInboxEmailOptions,
    options: ReplyInboxEmailRequestOptions = {},
  ): Promise<ReplyInboxEmailResponse> {
    const {
      inboxId,
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
    return this.resend.post<ReplyInboxEmailResponseSuccess>(
      `/inboxes/${inboxId}/emails/${emailId}/reply`,
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
    payload: ForwardInboxEmailOptions,
    options: ForwardInboxEmailRequestOptions = {},
  ): Promise<ForwardInboxEmailResponse> {
    const {
      inboxId,
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
    return this.resend.post<ForwardInboxEmailResponseSuccess>(
      `/inboxes/${inboxId}/emails/${emailId}/forward`,
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
