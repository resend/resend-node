import type { RequestOptions } from '../../common/interfaces/request-options.interface';
import type { Resend } from '../../resend';
import { buildInboxCursorUrl } from '../build-inbox-cursor-query';
import { InboxThreadEmails } from './emails/emails';
import type {
  GetInboxThreadOptions,
  GetInboxThreadResponse,
  GetInboxThreadResponseSuccess,
} from './interfaces/get-inbox-thread.interface';
import type {
  ListInboxThreadsOptions,
  ListInboxThreadsResponse,
  ListInboxThreadsResponseSuccess,
} from './interfaces/list-inbox-threads.interface';
import type {
  RemoveInboxThreadOptions,
  RemoveInboxThreadResponse,
  RemoveInboxThreadResponseSuccess,
} from './interfaces/remove-inbox-thread.interface';
import type {
  SearchInboxThreadsOptions,
  SearchInboxThreadsResponse,
  SearchInboxThreadsResponseSuccess,
} from './interfaces/search-inbox-threads.interface';
import type {
  UpdateInboxThreadOptions,
  UpdateInboxThreadResponse,
  UpdateInboxThreadResponseSuccess,
} from './interfaces/update-inbox-thread.interface';

export class InboxThreads {
  readonly emails: InboxThreadEmails;

  constructor(private readonly resend: Resend) {
    this.emails = new InboxThreadEmails(resend);
  }

  async list(
    options: ListInboxThreadsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<ListInboxThreadsResponse> {
    const { inboxId, folders, labels, read, limit, after, before } = options;
    const url = buildInboxCursorUrl(`/inboxes/${inboxId}/threads`, {
      folders,
      labels,
      read,
      limit,
      after,
      before,
    });
    return this.resend.get<ListInboxThreadsResponseSuccess>(
      url,
      requestOptions,
    );
  }

  async search(
    options: SearchInboxThreadsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<SearchInboxThreadsResponse> {
    const {
      inboxId,
      folders,
      labels,
      read,
      query,
      from,
      to,
      cc,
      bcc,
      hasAttachment,
      startDate,
      endDate,
      limit,
      after,
      before,
    } = options;
    const url = buildInboxCursorUrl(`/inboxes/${inboxId}/threads/search`, {
      folders,
      labels,
      read,
      query,
      from,
      to,
      cc,
      bcc,
      has_attachment: hasAttachment,
      start_date: startDate,
      end_date: endDate,
      limit,
      after,
      before,
    });
    return this.resend.get<SearchInboxThreadsResponseSuccess>(
      url,
      requestOptions,
    );
  }

  async get(
    options: GetInboxThreadOptions,
    requestOptions: RequestOptions = {},
  ): Promise<GetInboxThreadResponse> {
    const { inboxId, threadId } = options;
    return this.resend.get<GetInboxThreadResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}`,
      requestOptions,
    );
  }

  async update(
    options: UpdateInboxThreadOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateInboxThreadResponse> {
    const { inboxId, threadId, read, folder, labelId } = options;
    return this.resend.patch<UpdateInboxThreadResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}`,
      {
        read,
        folder,
        label_id: labelId,
      },
      requestOptions,
    );
  }

  async remove(
    options: RemoveInboxThreadOptions,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveInboxThreadResponse> {
    const { inboxId, threadId } = options;
    return this.resend.delete<RemoveInboxThreadResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}`,
      undefined,
      requestOptions,
    );
  }
}
