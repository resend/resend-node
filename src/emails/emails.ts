import type * as React from 'react';
import { PaginatedRequest } from '../common/pagination';
import { parseEmailToApiOptions } from '../common/utils/parse-email-to-api-options';
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
  ListEmail,
  ListEmailsOptions,
  ListEmailsResponseSuccess,
} from './interfaces/list-emails-options.interface';
import type {
  UpdateEmailOptions,
  UpdateEmailResponse,
  UpdateEmailResponseSuccess,
} from './interfaces/update-email-options.interface';

export class Emails {
  private renderAsync?: (component: React.ReactElement) => Promise<string>;
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
      if (!this.renderAsync) {
        try {
          const { renderAsync } = await import('@react-email/render');
          this.renderAsync = renderAsync;
        } catch {
          throw new Error(
            'Failed to render React component. Make sure to install `@react-email/render`',
          );
        }
      }

      payload.html = await this.renderAsync(
        payload.react as React.ReactElement,
      );
    }

    const data = await this.resend.post<CreateEmailResponseSuccess>(
      '/emails',
      parseEmailToApiOptions(payload),
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

  list(options: ListEmailsOptions = {}): PaginatedRequest<ListEmail> {
    const fetchPage = async (options: ListEmailsOptions) => {
      const searchParams = new URLSearchParams();

      if (options.limit !== undefined) {
        searchParams.set('limit', options.limit.toString());
      }

      if ('after' in options && options.after !== undefined) {
        searchParams.set('after', options.after);
      }

      if ('before' in options && options.before !== undefined) {
        searchParams.set('before', options.before);
      }

      const queryString = searchParams.toString();
      const url = queryString ? `/emails?${queryString}` : '/emails';
      return this.resend.get<ListEmailsResponseSuccess>(url);
    };

    return new PaginatedRequest(fetchPage, options);
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
