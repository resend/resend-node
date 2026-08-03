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
  GetEmailsMetricsOptions,
  GetEmailsMetricsResponse,
  GetEmailsMetricsResponseSuccess,
} from './interfaces/get-metrics.interface';
import type {
  ListEmailsOptions,
  ListEmailsResponse,
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
    const body: CreateEmailOptions = { ...payload };

    if (payload.react) {
      body.html = await render(payload.react);
    }

    const data = await this.resend.post<CreateEmailResponseSuccess>(
      '/emails',
      parseEmailToApiOptions(body),
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

  async list(options: ListEmailsOptions = {}): Promise<ListEmailsResponse> {
    const queryString = buildPaginationQuery(options);
    const url = queryString ? `/emails?${queryString}` : '/emails';

    const data = await this.resend.get<ListEmailsResponseSuccess>(url);

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

  async metrics(
    options: GetEmailsMetricsOptions = {},
  ): Promise<GetEmailsMetricsResponse> {
    const queryString = buildMetricsQuery(options);
    const url = queryString
      ? `/emails/metrics?${queryString}`
      : '/emails/metrics';

    const data = await this.resend.get<GetEmailsMetricsResponseSuccess>(url);
    return data;
  }
}

function buildMetricsQuery(options: GetEmailsMetricsOptions) {
  const {
    startDate,
    endDate,
    timezone,
    granularity,
    metrics,
    dimensions,
    filter,
  } = options;
  const searchParams = new URLSearchParams();

  if (startDate !== undefined) {
    searchParams.set('start_date', startDate);
  }

  if (endDate !== undefined) {
    searchParams.set('end_date', endDate);
  }

  if (timezone !== undefined) {
    searchParams.set('timezone', timezone);
  }

  if (granularity !== undefined) {
    searchParams.set('granularity', granularity);
  }

  if (metrics !== undefined) {
    searchParams.set('metrics', metrics.join(','));
  }

  if (dimensions !== undefined) {
    searchParams.set('dimensions', dimensions.join(','));
  }

  if (filter?.domainId !== undefined) {
    searchParams.set('filter[domain_id]', filter.domainId.join(','));
  }

  return searchParams.toString();
}
