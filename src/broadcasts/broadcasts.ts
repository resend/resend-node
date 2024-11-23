import type * as React from 'react';
import type { Resend } from '../resend';
import type {
  CreateBroadcastOptions,
  CreateBroadcastRequestOptions,
} from './interfaces/create-broadcast-options.interface';
import type {
  SendBroadcastOptions,
  SendBroadcastResponse,
  SendBroadcastResponseSuccess,
} from './interfaces/send-broadcast-options.interface';

export class Broadcasts {
  private renderAsync?: (component: React.ReactElement) => Promise<string>;
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateBroadcastOptions,
    options: CreateBroadcastRequestOptions = {},
  ): Promise<SendBroadcastResponse> {
    if (payload.react) {
      if (!this.renderAsync) {
        try {
          const { renderAsync } = await import('@react-email/render');
          this.renderAsync = renderAsync;
        } catch (error) {
          throw new Error(
            'Failed to render React component. Make sure to install `@react-email/render`',
          );
        }
      }

      payload.html = await this.renderAsync(
        payload.react as React.ReactElement,
      );
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
    payload: SendBroadcastOptions,
  ): Promise<SendBroadcastResponse> {
    const data = await this.resend.post<SendBroadcastResponseSuccess>(
      `/broadcasts/${id}/send`,
      { scheduled_at: payload.scheduledAt },
    );

    return data;
  }
}
