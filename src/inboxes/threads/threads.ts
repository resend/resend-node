import type { Resend } from '../../resend';
import { buildInboxCursorUrl } from '../build-inbox-cursor-query';
import { InboxThreadEmails } from './emails/emails';
import type {
  GetInboxThreadResponse,
  GetInboxThreadResponseSuccess,
} from './interfaces/get-inbox-thread.interface';
import type {
  ListInboxThreadsOptions,
  ListInboxThreadsResponse,
  ListInboxThreadsResponseSuccess,
} from './interfaces/list-inbox-threads.interface';
import type {
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
    inboxId: string,
    options: ListInboxThreadsOptions = {},
  ): Promise<ListInboxThreadsResponse> {
    const url = buildInboxCursorUrl(`/inboxes/${inboxId}/threads`, options);
    return this.resend.get<ListInboxThreadsResponseSuccess>(url);
  }

  async get(
    inboxId: string,
    threadId: string,
  ): Promise<GetInboxThreadResponse> {
    return this.resend.get<GetInboxThreadResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}`,
    );
  }

  async update(
    inboxId: string,
    threadId: string,
    payload: UpdateInboxThreadOptions,
  ): Promise<UpdateInboxThreadResponse> {
    return this.resend.patch<UpdateInboxThreadResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}`,
      payload,
    );
  }

  async remove(
    inboxId: string,
    threadId: string,
  ): Promise<RemoveInboxThreadResponse> {
    return this.resend.delete<RemoveInboxThreadResponseSuccess>(
      `/inboxes/${inboxId}/threads/${threadId}`,
    );
  }
}
