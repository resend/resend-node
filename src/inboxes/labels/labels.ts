import type { Resend } from '../../resend';
import type {
  CreateInboxLabelOptions,
  CreateInboxLabelRequestOptions,
  CreateInboxLabelResponse,
  CreateInboxLabelResponseSuccess,
} from './interfaces/create-inbox-label.interface';
import type {
  ListInboxLabelsResponse,
  ListInboxLabelsResponseSuccess,
} from './interfaces/list-inbox-labels.interface';
import type {
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

  async list(inboxId: string): Promise<ListInboxLabelsResponse> {
    return this.resend.get<ListInboxLabelsResponseSuccess>(
      `/inboxes/${inboxId}/labels`,
    );
  }

  async create(
    inboxId: string,
    payload: CreateInboxLabelOptions,
    options: CreateInboxLabelRequestOptions = {},
  ): Promise<CreateInboxLabelResponse> {
    return this.resend.post<CreateInboxLabelResponseSuccess>(
      `/inboxes/${inboxId}/labels`,
      payload,
      options,
    );
  }

  async update(
    inboxId: string,
    labelId: string,
    payload: UpdateInboxLabelOptions,
  ): Promise<UpdateInboxLabelResponse> {
    return this.resend.patch<UpdateInboxLabelResponseSuccess>(
      `/inboxes/${inboxId}/labels/${labelId}`,
      payload,
    );
  }

  async remove(
    inboxId: string,
    labelId: string,
  ): Promise<RemoveInboxLabelResponse> {
    return this.resend.delete<RemoveInboxLabelResponseSuccess>(
      `/inboxes/${inboxId}/labels/${labelId}`,
    );
  }
}
