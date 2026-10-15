import type { RequestOptions } from '../../common/interfaces/request-options.interface';
import type { Resend } from '../../resend';
import { buildInboxCursorUrl } from '../build-inbox-cursor-query';
import { buildInboxPath, missingInboxError } from '../build-inbox-path';
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
import { InboxThreadLabels } from './labels/labels';

export class InboxThreads {
  readonly emails: InboxThreadEmails;
  readonly labels: InboxThreadLabels;

  constructor(private readonly resend: Resend) {
    this.emails = new InboxThreadEmails(resend);
    this.labels = new InboxThreadLabels(resend);
  }

  async list(
    options: ListInboxThreadsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<ListInboxThreadsResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    const { folders, labels, read, limit, after, before } = options;
    const url = buildInboxCursorUrl(`${inboxPath}/threads`, {
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
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    const {
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
    const url = buildInboxCursorUrl(`${inboxPath}/threads/search`, {
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
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    return this.resend.get<GetInboxThreadResponseSuccess>(
      `${inboxPath}/threads/${options.threadId}`,
      requestOptions,
    );
  }

  async update(
    options: UpdateInboxThreadOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateInboxThreadResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    const { threadId, read, folder } = options;
    return this.resend.patch<UpdateInboxThreadResponseSuccess>(
      `${inboxPath}/threads/${threadId}`,
      { read, folder },
      requestOptions,
    );
  }

  async remove(
    options: RemoveInboxThreadOptions,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveInboxThreadResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    return this.resend.delete<RemoveInboxThreadResponseSuccess>(
      `${inboxPath}/threads/${options.threadId}`,
      undefined,
      requestOptions,
    );
  }
}
