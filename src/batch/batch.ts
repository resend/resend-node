import type * as React from 'react';
import type { EmailAPIOptions } from '../common/interfaces/email-api-options.interface';
import { parseEmailToAPIOptions } from '../common/utils/parse-email-to-api-options';
import type { Resend } from '../resend';
import type {
  CreateBatchOptions,
  CreateBatchRequestOptions,
  CreateBatchResponse,
  CreateBatchSuccessResponse,
} from './interfaces/create-batch-options.interface';

export class Batch {
  private renderAsync?: (component: React.ReactElement) => Promise<string>;
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
    const emails: EmailAPIOptions[] = [];

    for (const email of payload) {
      if (email.react) {
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

        email.html = await this.renderAsync(email.react as React.ReactElement);
        email.react = undefined;
      }

      emails.push(parseEmailToAPIOptions(email));
    }

    const data = await this.resend.post<CreateBatchSuccessResponse>(
      '/emails/batch',
      emails,
      options,
    );

    return data;
  }
}
