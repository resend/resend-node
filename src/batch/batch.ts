import { renderAsync } from '@react-email/render';
import type * as React from 'react';
import type { Resend } from '../resend';
import type {
  CreateBatchOptions,
  CreateBatchRequestOptions,
  CreateBatchResponse,
  CreateBatchSuccessResponse,
} from './interfaces/create-batch-options.interface';

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
    const data = await this.resend.post<CreateBatchSuccessResponse>(
      '/emails/batch',
      await Promise.all(
        payload.map(async ({ react, replyTo, ...email }) => ({
          ...email,
          reply_to: replyTo,
          html: await renderAsync(react as React.ReactElement),
        }))
      ),
      options
    );

    return data;
  }
}
