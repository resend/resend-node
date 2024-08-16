import { renderAsync } from '@react-email/render';
import type * as React from 'react';
import type { Resend } from '../resend';
import type {
  CancelEmailResponse,
  CancelEmailResponseSuccess,
} from './interfaces/cancel-email-options.interface';
import type {
  CreateEmailOptions,
  CreateEmailRequestOptions,
  CreateEmailResponse,
  CreateEmailResponseSuccess,
} from './interfaces/create-email-options.interface';
import type {
  GetEmailResponse,
  GetEmailResponseSuccess,
} from './interfaces/get-email-options.interface';
import type {
  UpdateEmailOptions,
  UpdateEmailResponse,
  UpdateEmailResponseSuccess,
} from './interfaces/update-email-options.interface';

export class Emails {
  constructor(private readonly resend: Resend) {}

  async send(
    payload: CreateEmailOptions,
    options: CreateEmailRequestOptions = {},
  ) {
    return this.create(payload, options);
  }

  async create(
    payload: CreateEmailOptions,
    options: CreateEmailRequestOptions = {},
  ): Promise<CreateEmailResponse> {
    if (payload.react) {
      payload.html = await renderAsync(payload.react as React.ReactElement);
      // biome-ignore lint/performance/noDelete: <explanation>
      delete payload.react;
    }

    const data = await this.resend.post<CreateEmailResponseSuccess>(
      '/emails',
      {
        attachments: payload.attachments,
        bcc: payload.bcc,
        cc: payload.cc,
        from: payload.from,
        headers: payload.headers,
        html: payload.html,
        reply_to: payload.replyTo,
        scheduled_at: payload.scheduledAt,
        subject: payload.subject,
        tags: payload.tags,
        text: payload.text,
        to: payload.to,
      },
      options,
    );

    return data;
  }

  async get(id: string): Promise<GetEmailResponse> {
    const data = await this.resend.get<GetEmailResponseSuccess>(
      `/emails/${id}`,
    );
    return data;
  }

  async update(payload: UpdateEmailOptions): Promise<UpdateEmailResponse> {
    const data = await this.resend.patch<UpdateEmailResponseSuccess>(
      `/emails/${payload.id}`,
      {
        scheduled_at: payload.scheduledAt,
      },
    );
    return data;
  }

  async cancel(id: string): Promise<CancelEmailResponse> {
    const data = await this.resend.post<CancelEmailResponseSuccess>(
      `/emails/${id}/cancel`,
    );
    return data;
  }
}
