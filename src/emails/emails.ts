import { render } from '@react-email/render';
import * as React from 'react';
import { Resend } from '../resend';
import {
  CreateEmailOptions,
  CreateEmailRequestOptions,
  CreateEmailResponse,
  GetEmailResponse,
} from './interfaces';

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
  ) {
    if (payload.react) {
      payload.html = render(payload.react as React.ReactElement);
      delete payload.react;
    }

    const data = await this.resend.post<CreateEmailResponse>(
      '/emails',
      payload,
      options,
    );
    return data;
  }

  async get(id: string) {
    const data = await this.resend.get<GetEmailResponse>(`/emails/${id}`);
    return data;
  }
}
