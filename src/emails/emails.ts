import type { RequestOptions } from '../common/interfaces/request-options.interface';
import { buildPaginationUrl } from '../common/utils/build-pagination-query';
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
  ShareEmailOptions,
  ShareEmailResponse,
  ShareEmailResponseSuccess,
} from './interfaces/share-email-options.interface';
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
    requestOptions: CreateEmailRequestOptions = {},
  ) {
    return this.create(payload, requestOptions);
  }

  async create(
    payload: CreateEmailOptions,
    requestOptions: CreateEmailRequestOptions = {},
  ): Promise<CreateEmailResponse> {
    const body: CreateEmailOptions = { ...payload };

    if (payload.react) {
      body.html = await render(payload.react);
    }

    const data = await this.resend.post<CreateEmailResponseSuccess>(
      '/emails',
      parseEmailToApiOptions(body),
      requestOptions,
    );

    return data;
  }

  async get(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<GetEmailResponse> {
    const data = await this.resend.get<GetEmailResponseSuccess>(
      `/emails/${id}`,
      requestOptions,
    );

    return data;
  }

  async list(
    options: ListEmailsOptions = {},
    requestOptions: RequestOptions = {},
  ): Promise<ListEmailsResponse> {
    const url = buildPaginationUrl('/emails', options);

    const data = await this.resend.get<ListEmailsResponseSuccess>(
      url,
      requestOptions,
    );

    return data;
  }

  async update(
    payload: UpdateEmailOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateEmailResponse> {
    const data = await this.resend.patch<UpdateEmailResponseSuccess>(
      `/emails/${payload.id}`,
      {
        scheduled_at: payload.scheduledAt,
      },
      requestOptions,
    );
    return data;
  }

  async cancel(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<CancelEmailResponse> {
    const data = await this.resend.post<CancelEmailResponseSuccess>(
      `/emails/${id}/cancel`,
      undefined,
      requestOptions,
    );
    return data;
  }

  async share(
    id: string,
    payload?: ShareEmailOptions,
    requestOptions: RequestOptions = {},
  ): Promise<ShareEmailResponse> {
    const data = await this.resend.post<ShareEmailResponseSuccess>(
      `/emails/${id}/share`,
      { expires_in: payload?.expiresIn },
      requestOptions,
    );
    return data;
  }

  async metrics(
    options: GetEmailsMetricsOptions = {},
    requestOptions: RequestOptions = {},
  ): Promise<GetEmailsMetricsResponse> {
    const queryString = buildMetricsQuery(options);
    const url = queryString
      ? `/emails/metrics?${queryString}`
      : '/emails/metrics';

    const data = await this.resend.get<GetEmailsMetricsResponseSuccess>(
      url,
      requestOptions,
    );
    return data;
  }
}

function buildMetricsQuery(options: GetEmailsMetricsOptions) {
  const params: Record<string, string | undefined> = {
    start_date: options.startDate,
    end_date: options.endDate,
    timezone: options.timezone,
    granularity: options.granularity,
    metrics: options.metrics?.join(','),
    dimensions: options.dimensions?.join(','),
    domain_id: options.domainId?.join(','),
    email_id: options.emailId?.join(','),
    broadcast_id: options.broadcastId?.join(','),
  };

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      searchParams.set(key, value);
    }
  }

  return searchParams.toString();
}
