import { render } from '@react-email/render';
import * as React from 'react';
import { Resend } from '../resend';
import {
  CreateBatchOptions,
  CreateBatchRequestOptions,
  CreateBatchResponse,
} from './interfaces';

export class Batch {
  constructor(private readonly resend: Resend) {}

  async send(
    payload: CreateBatchOptions,
    options: CreateBatchRequestOptions = {},
  ): Promise<CreateBatchResponse> {
    return this.create(payload, options);
  }

  async create(
    payload: CreateBatchOptions,
    options: CreateBatchRequestOptions = {},
  ): Promise<CreateBatchResponse> {
    for (const email of payload) {
      if (email.react) {
        email.html = render(email.react as React.ReactElement);
        delete email.react;
      }
    }

    const data = await this.resend.post<CreateBatchResponse>(
      '/emails/batch',
      payload,
      options,
    );

    return data;
  }
}
