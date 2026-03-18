import type * as React from 'react';
import { PaginatedRequest } from '../common/pagination';
import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import { parseEmailToApiOptions } from '../common/utils/parse-email-to-api-options';
import { render } from '../render';
import type { Resend } from '../resend';
import { Attachments } from './attachments/attachments';
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
import { Receiving } from './receiving/receiving';

export class Emails {
  readonly attachments: Attachments;
  readonly receiving: Receiving;

  constructor(private readonly resend: Resend) {
    this.attachments = new Attachments(resend);
    this.receiving = new Receiving(resend);
  }

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
      payload.html = await render(payload.react as React.ReactElement);
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
    const fetchPage = async (pageOptions: ListEmailsOptions) => {
      const queryString = buildPaginationQuery(pageOptions);
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
