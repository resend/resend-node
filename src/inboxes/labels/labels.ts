import type { RequestOptions } from '../../common/interfaces/request-options.interface';
import type { Resend } from '../../resend';
import { buildInboxPath, missingInboxError } from '../build-inbox-path';
import type {
  CreateInboxLabelOptions,
  CreateInboxLabelRequestOptions,
  CreateInboxLabelResponse,
  CreateInboxLabelResponseSuccess,
} from './interfaces/create-inbox-label.interface';
import type {
  ListInboxLabelsOptions,
  ListInboxLabelsResponse,
  ListInboxLabelsResponseSuccess,
} from './interfaces/list-inbox-labels.interface';
import type {
  RemoveInboxLabelOptions,
  RemoveInboxLabelResponse,
  RemoveInboxLabelResponseSuccess,
} from './interfaces/remove-inbox-label.interface';
import type {
  UpdateInboxLabelOptions,
  UpdateInboxLabelResponse,
  UpdateInboxLabelResponseSuccess,
} from './interfaces/update-inbox-label.interface';

export class InboxLabels {
  constructor(private readonly resend: Resend) {}

  async list(
    options: ListInboxLabelsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<ListInboxLabelsResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    return this.resend.get<ListInboxLabelsResponseSuccess>(
      `${inboxPath}/labels`,
      requestOptions,
    );
  }

  async create(
    payload: CreateInboxLabelOptions,
    options: CreateInboxLabelRequestOptions = {},
  ): Promise<CreateInboxLabelResponse> {
    const inboxPath = buildInboxPath(payload);
    if (!inboxPath) {
      return missingInboxError();
    }

    const { name, color } = payload;
    return this.resend.post<CreateInboxLabelResponseSuccess>(
      `${inboxPath}/labels`,
      { name, color },
      options,
    );
  }

  async update(
    options: UpdateInboxLabelOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateInboxLabelResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    const { labelId, name, color } = options;
    return this.resend.patch<UpdateInboxLabelResponseSuccess>(
      `${inboxPath}/labels/${labelId}`,
      { name, color },
      requestOptions,
    );
  }

  async remove(
    options: RemoveInboxLabelOptions,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveInboxLabelResponse> {
    const inboxPath = buildInboxPath(options);
    if (!inboxPath) {
      return missingInboxError();
    }

    return this.resend.delete<RemoveInboxLabelResponseSuccess>(
      `${inboxPath}/labels/${options.labelId}`,
      undefined,
      requestOptions,
    );
  }
}
