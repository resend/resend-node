import type { Resend } from '../../resend';
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
  ): Promise<ListInboxLabelsResponse> {
    return this.resend.get<ListInboxLabelsResponseSuccess>(
      `/inboxes/${options.inboxId}/labels`,
    );
  }

  async create(
    payload: CreateInboxLabelOptions,
    options: CreateInboxLabelRequestOptions = {},
  ): Promise<CreateInboxLabelResponse> {
    const { inboxId, name, color } = payload;
    return this.resend.post<CreateInboxLabelResponseSuccess>(
      `/inboxes/${inboxId}/labels`,
      { name, color },
      options,
    );
  }

  async update(
    options: UpdateInboxLabelOptions,
  ): Promise<UpdateInboxLabelResponse> {
    const { inboxId, labelId, name, color } = options;
    return this.resend.patch<UpdateInboxLabelResponseSuccess>(
      `/inboxes/${inboxId}/labels/${labelId}`,
      { name, color },
    );
  }

  async remove(
    options: RemoveInboxLabelOptions,
  ): Promise<RemoveInboxLabelResponse> {
    const { inboxId, labelId } = options;
    return this.resend.delete<RemoveInboxLabelResponseSuccess>(
      `/inboxes/${inboxId}/labels/${labelId}`,
    );
  }
}
