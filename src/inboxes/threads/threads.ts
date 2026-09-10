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
  ): Promise<ListInboxThreadsResponse> {
    const { inboxId, ...query } = options;
    const url = buildInboxCursorUrl(`/inboxes/${inboxId}/threads`, query);
    return this.resend.get<ListInboxThreadsResponseSuccess>(url);
  }

  async get(options: GetInboxThreadOptions): Promise<GetInboxThreadResponse> {
    const { inboxId, threadId } = options;
    return this.resend.get<GetInboxThreadResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}`,
    );
  }

  async update(
    options: UpdateInboxThreadOptions,
  ): Promise<UpdateInboxThreadResponse> {
    const { inboxId, threadId, read, folder, labelId } = options;
    return this.resend.patch<UpdateInboxThreadResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}`,
      {
        read,
        folder,
        label_id: labelId,
      },
    );
  }

  async remove(
    options: RemoveInboxThreadOptions,
  ): Promise<RemoveInboxThreadResponse> {
    const { inboxId, threadId } = options;
    return this.resend.delete<RemoveInboxThreadResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}`,
    );
  }
}
