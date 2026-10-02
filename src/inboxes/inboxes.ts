import type { RequestOptions } from '../common/interfaces/request-options.interface';
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
        from_name: payload.fromName,
      },
      options,
    );
  }

  async list(
    options: ListInboxesOptions = {},
    requestOptions: RequestOptions = {},
  ): Promise<ListInboxesResponse> {
    const url = buildPaginationUrl('/inboxes', options);
    return this.resend.get<ListInboxesResponseSuccess>(url, requestOptions);
  }

  async get(
    idOrEmail: string,
    requestOptions: RequestOptions = {},
  ): Promise<GetInboxResponse> {
    return this.resend.get<GetInboxResponseSuccess>(
      `/inboxes/${encodeURIComponent(idOrEmail)}`,
      requestOptions,
    );
  }

  async update(
    id: string,
    payload: UpdateInboxOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateInboxResponse> {
    return this.resend.patch<UpdateInboxResponseSuccess>(
      `/inboxes/${id}`,
      {
        name: payload.name,
        from_name: payload.fromName,
      },
      requestOptions,
    );
  }

  async remove(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveInboxResponse> {
    return this.resend.delete<RemoveInboxResponseSuccess>(
      `/inboxes/${id}`,
      undefined,
      requestOptions,
    );
  }
}
