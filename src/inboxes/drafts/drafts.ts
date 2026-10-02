import type { RequestOptions } from '../../common/interfaces/request-options.interface';
import type { Resend } from '../../resend';
import { buildInboxCursorUrl } from '../build-inbox-cursor-query';
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
    const { inboxId, limit, after, before } = options;
    const url = buildInboxCursorUrl(`/inboxes/${inboxId}/drafts`, {
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
    const { inboxId, threadId, replyToEmailId, ...content } = payload;
    return this.resend.post<CreateInboxDraftResponseSuccess>(
      `/inboxes/${inboxId}/drafts`,
      {
        ...content,
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
    const { inboxId, draftId } = options;
    return this.resend.get<GetInboxDraftResponseSuccess>(
      `/inboxes/${inboxId}/drafts/${draftId}`,
      requestOptions,
    );
  }

  async update(
    options: UpdateInboxDraftOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateInboxDraftResponse> {
    const { inboxId, draftId, ...content } = options;
    return this.resend.patch<UpdateInboxDraftResponseSuccess>(
      `/inboxes/${inboxId}/drafts/${draftId}`,
      content,
      requestOptions,
    );
  }

  async remove(
    options: RemoveInboxDraftOptions,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveInboxDraftResponse> {
    const { inboxId, draftId } = options;
    return this.resend.delete<RemoveInboxDraftResponseSuccess>(
      `/inboxes/${inboxId}/drafts/${draftId}`,
      undefined,
      requestOptions,
    );
  }

  async send(
    payload: SendInboxDraftOptions,
    options: SendInboxDraftRequestOptions = {},
  ): Promise<SendInboxDraftResponse> {
    const { inboxId, draftId } = payload;
    return this.resend.post<SendInboxDraftResponseSuccess>(
      `/inboxes/${inboxId}/drafts/${draftId}/send`,
      undefined,
      options,
    );
  }
}
