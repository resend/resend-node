import type * as React from 'react';
import type { EmailApiOptions } from '../common/interfaces/email-api-options.interface';
import { parseEmailToApiOptions } from '../common/utils/parse-email-to-api-options';
import type { Resend } from '../resend';
import type {
  CreateBatchOptions,
  CreateBatchRequestOptions,
  CreateBatchResponse,
  CreateBatchSuccessResponse,
} from './interfaces/create-batch-options.interface';

export class Batch {
  private render?: (component: React.ReactElement) => Promise<string>;
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
    const emails: EmailApiOptions[] = [];

    for (const email of payload) {
      if (email.react) {
        if (!this.render) {
          try {
            const { render } = await import('@react-email/render');
            this.render = render;
          } catch (error) {
            throw new Error(
              'Failed to render React component. Make sure to install `@react-email/render`',
            );
          }
        }

        email.html = await this.render(email.react as React.ReactElement);
        email.react = undefined;
      }

      emails.push(parseEmailToApiOptions(email));
    }

    const data = await this.resend.post<CreateBatchSuccessResponse>(
      '/emails/batch',
      emails,
      options,
    );

    return data;
  }
}
