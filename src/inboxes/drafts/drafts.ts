import type { Resend } from '../../resend';
import { buildInboxCursorUrl } from '../build-inbox-cursor-query';
import type {
  CreateInboxDraftOptions,
  CreateInboxDraftRequestOptions,
  CreateInboxDraftResponse,
  CreateInboxDraftResponseSuccess,
} from './interfaces/create-inbox-draft.interface';
import type {
  GetInboxDraftResponse,
  GetInboxDraftResponseSuccess,
} from './interfaces/get-inbox-draft.interface';
import type {
  ListInboxDraftsOptions,
  ListInboxDraftsResponse,
  ListInboxDraftsResponseSuccess,
} from './interfaces/list-inbox-drafts.interface';
import type {
  RemoveInboxDraftResponse,
  RemoveInboxDraftResponseSuccess,
} from './interfaces/remove-inbox-draft.interface';
import type {
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
    inboxId: string,
    options: ListInboxDraftsOptions = {},
  ): Promise<ListInboxDraftsResponse> {
    const url = buildInboxCursorUrl(`/inboxes/${inboxId}/drafts`, options);
    return this.resend.get<ListInboxDraftsResponseSuccess>(url);
  }

  async create(
    inboxId: string,
    payload: CreateInboxDraftOptions,
    options: CreateInboxDraftRequestOptions = {},
  ): Promise<CreateInboxDraftResponse> {
    return this.resend.post<CreateInboxDraftResponseSuccess>(
      `/inboxes/${inboxId}/drafts`,
      payload,
      options,
    );
  }

  async get(inboxId: string, draftId: string): Promise<GetInboxDraftResponse> {
    return this.resend.get<GetInboxDraftResponseSuccess>(
      `/inboxes/${inboxId}/drafts/${draftId}`,
    );
  }

  async update(
    inboxId: string,
    draftId: string,
    payload: UpdateInboxDraftOptions,
  ): Promise<UpdateInboxDraftResponse> {
    return this.resend.patch<UpdateInboxDraftResponseSuccess>(
      `/inboxes/${inboxId}/drafts/${draftId}`,
      payload,
    );
  }

  async remove(
    inboxId: string,
    draftId: string,
  ): Promise<RemoveInboxDraftResponse> {
    return this.resend.delete<RemoveInboxDraftResponseSuccess>(
      `/inboxes/${inboxId}/drafts/${draftId}`,
    );
  }

  async send(
    inboxId: string,
    draftId: string,
    options: SendInboxDraftRequestOptions = {},
  ): Promise<SendInboxDraftResponse> {
    return this.resend.post<SendInboxDraftResponseSuccess>(
      `/inboxes/${inboxId}/drafts/${draftId}/send`,
      undefined,
      options,
    );
  }
}
