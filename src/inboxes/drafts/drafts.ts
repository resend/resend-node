import type { RequestOptions } from '../../common/interfaces/request-options.interface';
import { parseAttachments } from '../../common/utils/parse-email-to-api-options';
import type { Resend } from '../../resend';
import { buildInboxCursorUrl } from '../build-inbox-cursor-query';
import { buildInboxPath, missingInboxError } from '../build-inbox-path';
import type {
  CreateInboxDraftOptions,
  CreateInboxDraftRequestOptions,
  CreateInboxDraftResponse,
  CreateInboxDraftResponseSuccess,
} from './interfaces/create-inbox-draft.interface';
import type {
  GetInboxDraftOptions,
  GetInboxDraftResponse,
  GetInboxDraftResponseSuccess,
} from './interfaces/get-inbox-draft.interface';
import type {
  ListInboxDraftsOptions,
  ListInboxDraftsResponse,
  ListInboxDraftsResponseSuccess,
} from './interfaces/list-inbox-drafts.interface';
import type {
  RemoveInboxDraftOptions,
  RemoveInboxDraftResponse,
  RemoveInboxDraftResponseSuccess,
} from './interfaces/remove-inbox-draft.interface';
import type {
  SendInboxDraftOptions,
  SendInboxDraftRequestOptions,
  SendInboxDraftResponse,
  SendInboxDraftResponseSuccess,
} from './interfaces/send-inbox-draft.interface';
import type {
  UpdateInboxDraftOptions,
  UpdateInboxDraftResponse,
  UpdateInboxDraftResponseSuccess,
} from './interfaces/update-inbox-draft.interface';

export class InboxDrafts {
  constructor(private readonly resend: Resend) {}

  async list(
    options: ListInboxDraftsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<ListInboxDraftsResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    const { limit, after, before } = options;
    const url = buildInboxCursorUrl(`${inboxPath}/drafts`, {
      limit,
      after,
      before,
    });
    return this.resend.get<ListInboxDraftsResponseSuccess>(url, requestOptions);
  }

  async create(
    payload: CreateInboxDraftOptions,
    options: CreateInboxDraftRequestOptions = {},
  ): Promise<CreateInboxDraftResponse> {
    const inboxPath = buildInboxPath(payload);
    if (!inboxPath) {
      return missingInboxError();
    }

    const {
      inboxId,
      email,
      threadId,
      replyToEmailId,
      attachments,
      ...content
    } = payload;
    return this.resend.post<CreateInboxDraftResponseSuccess>(
      `${inboxPath}/drafts`,
      {
        ...content,
        attachments: parseAttachments(attachments),
        thread_id: threadId,
        reply_to_email_id: replyToEmailId,
      },
      options,
    );
  }

  async get(
    options: GetInboxDraftOptions,
    requestOptions: RequestOptions = {},
  ): Promise<GetInboxDraftResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    return this.resend.get<GetInboxDraftResponseSuccess>(
      `${inboxPath}/drafts/${options.draftId}`,
      requestOptions,
    );
  }

  async update(
    options: UpdateInboxDraftOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateInboxDraftResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    const { inboxId, email, draftId, attachments, ...content } = options;
    return this.resend.patch<UpdateInboxDraftResponseSuccess>(
      `${inboxPath}/drafts/${draftId}`,
      {
        ...content,
        attachments:
          attachments === null ? null : parseAttachments(attachments),
      },
      requestOptions,
    );
  }

  async remove(
    options: RemoveInboxDraftOptions,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveInboxDraftResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    return this.resend.delete<RemoveInboxDraftResponseSuccess>(
      `${inboxPath}/drafts/${options.draftId}`,
      undefined,
      requestOptions,
    );
  }

  async send(
    payload: SendInboxDraftOptions,
    options: SendInboxDraftRequestOptions = {},
  ): Promise<SendInboxDraftResponse> {
    const inboxPath = buildInboxPath(payload);
    if (!inboxPath) {
      return missingInboxError();
    }

    const { draftId, headers } = payload;
    return this.resend.post<SendInboxDraftResponseSuccess>(
      `${inboxPath}/drafts/${draftId}/send`,
      headers ? { headers } : undefined,
      options,
    );
  }
}
