import { buildPaginationUrl } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
import { InboxDrafts } from './drafts/drafts';
import type {
  CreateInboxOptions,
  CreateInboxRequestOptions,
  CreateInboxResponse,
  CreateInboxResponseSuccess,
} from './interfaces/create-inbox.interface';
import type {
  GetInboxResponse,
  GetInboxResponseSuccess,
} from './interfaces/get-inbox.interface';
import type {
  ListInboxesOptions,
  ListInboxesResponse,
  ListInboxesResponseSuccess,
} from './interfaces/list-inboxes.interface';
import type {
  RemoveInboxResponse,
  RemoveInboxResponseSuccess,
} from './interfaces/remove-inbox.interface';
import type {
  UpdateInboxOptions,
  UpdateInboxResponse,
  UpdateInboxResponseSuccess,
} from './interfaces/update-inbox.interface';
import { InboxLabels } from './labels/labels';
import { InboxThreads } from './threads/threads';

export class Inboxes {
  readonly threads: InboxThreads;
  readonly labels: InboxLabels;
  readonly drafts: InboxDrafts;

  constructor(private readonly resend: Resend) {
    this.threads = new InboxThreads(resend);
    this.labels = new InboxLabels(resend);
    this.drafts = new InboxDrafts(resend);
  }

  async create(
    payload: CreateInboxOptions,
    options: CreateInboxRequestOptions = {},
  ): Promise<CreateInboxResponse> {
    return this.resend.post<CreateInboxResponseSuccess>(
      '/inboxes',
      {
        email_address: payload.emailAddress,
        name: payload.name,
        forwarding: payload.forwarding,
        friendly_name: payload.friendlyName,
      },
      options,
    );
  }

  async list(options: ListInboxesOptions = {}): Promise<ListInboxesResponse> {
    const url = buildPaginationUrl('/inboxes', options);
    return this.resend.get<ListInboxesResponseSuccess>(url);
  }

  async get(id: string): Promise<GetInboxResponse> {
    return this.resend.get<GetInboxResponseSuccess>(`/inboxes/${id}`);
  }

  async update(
    id: string,
    payload: UpdateInboxOptions,
  ): Promise<UpdateInboxResponse> {
    return this.resend.patch<UpdateInboxResponseSuccess>(`/inboxes/${id}`, {
      name: payload.name,
      friendly_name: payload.friendlyName,
    });
  }

  async remove(id: string): Promise<RemoveInboxResponse> {
    return this.resend.delete<RemoveInboxResponseSuccess>(`/inboxes/${id}`);
  }
}
