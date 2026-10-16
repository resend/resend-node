import type { RequestOptions } from '../../../common/interfaces/request-options.interface';
import type { Resend } from '../../../resend';
import { buildInboxPath, missingInboxError } from '../../build-inbox-path';
import type {
  AddInboxThreadLabelsOptions,
  AddInboxThreadLabelsResponse,
  AddInboxThreadLabelsResponseSuccess,
} from '../interfaces/add-inbox-thread-labels.interface';
import type {
  RemoveInboxThreadLabelOptions,
  RemoveInboxThreadLabelResponse,
  RemoveInboxThreadLabelResponseSuccess,
} from '../interfaces/remove-inbox-thread-label.interface';
import type {
  SetInboxThreadLabelsOptions,
  SetInboxThreadLabelsResponse,
  SetInboxThreadLabelsResponseSuccess,
} from '../interfaces/set-inbox-thread-labels.interface';

export class InboxThreadLabels {
  constructor(private readonly resend: Resend) {}

  async add(
    options: AddInboxThreadLabelsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<AddInboxThreadLabelsResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    const { threadId, labels } = options;
    return this.resend.post<AddInboxThreadLabelsResponseSuccess>(
      `${inboxPath}/threads/${threadId}/labels`,
      { labels },
      requestOptions,
    );
  }

  async set(
    options: SetInboxThreadLabelsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<SetInboxThreadLabelsResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    const { threadId, labels } = options;
    return this.resend.put<SetInboxThreadLabelsResponseSuccess>(
      `${inboxPath}/threads/${threadId}/labels`,
      { labels },
      requestOptions,
    );
  }

  async remove(
    options: RemoveInboxThreadLabelOptions,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveInboxThreadLabelResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    const { threadId, labelId } = options;
    return this.resend.delete<RemoveInboxThreadLabelResponseSuccess>(
      `${inboxPath}/threads/${threadId}/labels/${labelId}`,
      undefined,
      requestOptions,
    );
  }
}
