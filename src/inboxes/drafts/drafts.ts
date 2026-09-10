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
  ): Promise<ListInboxDraftsResponse> {
    const { inboxId, cursor } = options;
    const url = buildInboxCursorUrl(`/inboxes/${inboxId}/drafts`, { cursor });
    return this.resend.get<ListInboxDraftsResponseSuccess>(url);
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

  async get(options: GetInboxDraftOptions): Promise<GetInboxDraftResponse> {
    const { inboxId, draftId } = options;
    return this.resend.get<GetInboxDraftResponseSuccess>(
      `/inboxes/${inboxId}/drafts/${draftId}`,
    );
  }

  async update(
    options: UpdateInboxDraftOptions,
  ): Promise<UpdateInboxDraftResponse> {
    const { inboxId, draftId, ...content } = options;
    return this.resend.patch<UpdateInboxDraftResponseSuccess>(
      `/inboxes/${inboxId}/drafts/${draftId}`,
      content,
    );
  }

  async remove(
    options: RemoveInboxDraftOptions,
  ): Promise<RemoveInboxDraftResponse> {
    const { inboxId, draftId } = options;
    return this.resend.delete<RemoveInboxDraftResponseSuccess>(
      `/inboxes/${inboxId}/drafts/${draftId}`,
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
