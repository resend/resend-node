import { buildPaginationUrl } from '../common/utils/build-pagination-query';
import { render } from '../render';
import type { Resend } from '../resend';
import type {
  CreateBroadcastOptions,
  CreateBroadcastRequestOptions,
} from './interfaces/create-broadcast-options.interface';
import type {
  GetBroadcastResponse,
  GetBroadcastResponseSuccess,
} from './interfaces/get-broadcast.interface';
import type {
  GetBroadcastMetricsResponse,
  GetBroadcastMetricsResponseSuccess,
} from './interfaces/get-broadcast-metrics.interface';
import type {
  BroadcastRecipientEventType,
  ListBroadcastRecipientsOptions,
  ListBroadcastRecipientsResponse,
  ListBroadcastRecipientsResponseSuccess,
} from './interfaces/list-broadcast-recipients.interface';
import type {
  ListBroadcastsOptions,
  ListBroadcastsResponse,
  ListBroadcastsResponseSuccess,
} from './interfaces/list-broadcasts.interface';
import type {
  RemoveBroadcastResponse,
  RemoveBroadcastResponseSuccess,
} from './interfaces/remove-broadcast.interface';
import type {
  SendBroadcastOptions,
  SendBroadcastResponse,
  SendBroadcastResponseSuccess,
} from './interfaces/send-broadcast-options.interface';
import type {
  UpdateBroadcastOptions,
  UpdateBroadcastResponse,
  UpdateBroadcastResponseSuccess,
} from './interfaces/update-broadcast.interface';

export class Broadcasts {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateBroadcastOptions,
    options: CreateBroadcastRequestOptions = {},
  ): Promise<SendBroadcastResponse> {
    const html = payload.react ? await render(payload.react) : payload.html;

    const data = await this.resend.post<SendBroadcastResponseSuccess>(
      '/broadcasts',
      {
        name: payload.name,
        segment_id: payload.segmentId,
        audience_id: payload.audienceId,
        preview_text: payload.previewText,
        from: payload.from,
        html,
        reply_to: payload.replyTo,
        subject: payload.subject,
        text: payload.text,
        topic_id: payload.topicId,
        send: payload.send,
        scheduled_at: payload.scheduledAt,
      },
      options,
    );

    return data;
  }

  async send(
    id: string,
    payload?: SendBroadcastOptions,
  ): Promise<SendBroadcastResponse> {
    const data = await this.resend.post<SendBroadcastResponseSuccess>(
      `/broadcasts/${id}/send`,
      { scheduled_at: payload?.scheduledAt },
    );

    return data;
  }

  async list(
    options: ListBroadcastsOptions = {},
  ): Promise<ListBroadcastsResponse> {
    const url = buildPaginationUrl('/broadcasts', options);

    const data = await this.resend.get<ListBroadcastsResponseSuccess>(url);
    return data;
  }

  async get(id: string): Promise<GetBroadcastResponse> {
    const data = await this.resend.get<GetBroadcastResponseSuccess>(
      `/broadcasts/${id}`,
    );
    return data;
  }

  async metrics(id: string): Promise<GetBroadcastMetricsResponse> {
    const data = await this.resend.get<GetBroadcastMetricsResponseSuccess>(
      `/broadcasts/${id}/metrics`,
    );
    return data;
  }

  async recipients<T extends BroadcastRecipientEventType>(
    id: string,
    options: ListBroadcastRecipientsOptions<T>,
  ): Promise<ListBroadcastRecipientsResponse<T>> {
    const queryString = buildRecipientsQuery(
      options as ListBroadcastRecipientsOptions,
    );
    const url = `/broadcasts/${id}/recipients?${queryString}`;

    const data =
      await this.resend.get<ListBroadcastRecipientsResponseSuccess<T>>(url);
    return data;
  }

  async remove(id: string): Promise<RemoveBroadcastResponse> {
    const data = await this.resend.delete<RemoveBroadcastResponseSuccess>(
      `/broadcasts/${id}`,
    );
    return data;
  }

  async update(
    id: string,
    payload: UpdateBroadcastOptions,
  ): Promise<UpdateBroadcastResponse> {
    const html = payload.react ? await render(payload.react) : payload.html;

    const data = await this.resend.patch<UpdateBroadcastResponseSuccess>(
      `/broadcasts/${id}`,
      {
        name: payload.name,
        segment_id: payload.segmentId,
        audience_id: payload.audienceId,
        from: payload.from,
        html,
        text: payload.text,
        subject: payload.subject,
        reply_to: payload.replyTo,
        preview_text: payload.previewText,
        topic_id: payload.topicId,
      },
    );
    return data;
  }
}

function buildRecipientsQuery(options: ListBroadcastRecipientsOptions) {
  const { type, email, bounceType, ...pagination } = options;
  const searchParams = new URLSearchParams(buildPaginationQuery(pagination));

  searchParams.set('type', type);

  if (email !== undefined) {
    searchParams.set('email', email);
  }

  if (bounceType !== undefined) {
    searchParams.set('bounce_type', bounceType);
  }

  return searchParams.toString();
}
