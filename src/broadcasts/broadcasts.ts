import type * as React from 'react';
import { render } from '../common/utils/render';
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
    if (payload.react) {
      payload.html = await render(payload.react as React.ReactElement);
    }

    const data = await this.resend.post<SendBroadcastResponseSuccess>(
      '/broadcasts',
      {
        name: payload.name,
        audience_id: payload.audienceId,
        preview_text: payload.previewText,
        from: payload.from,
        html: payload.html,
        reply_to: payload.replyTo,
        subject: payload.subject,
        text: payload.text,
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

  async list(): Promise<ListBroadcastsResponse> {
    const data =
      await this.resend.get<ListBroadcastsResponseSuccess>('/broadcasts');
    return data;
  }

  async get(id: string): Promise<GetBroadcastResponse> {
    const data = await this.resend.get<GetBroadcastResponseSuccess>(
      `/broadcasts/${id}`,
    );
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
    const data = await this.resend.patch<UpdateBroadcastResponseSuccess>(
      `/broadcasts/${id}`,
      {
        name: payload.name,
        audience_id: payload.audienceId,
        from: payload.from,
        html: payload.html,
        text: payload.text,
        subject: payload.subject,
        reply_to: payload.replyTo,
        preview_text: payload.previewText,
      },
    );
    return data;
  }
}
