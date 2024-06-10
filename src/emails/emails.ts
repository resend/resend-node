import { renderAsync } from '@react-email/render';
import type * as React from 'react';
import type { Resend } from '../resend';
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
      payload,
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
}
