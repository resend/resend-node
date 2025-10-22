import { Webhook } from 'svix';
import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
import type {
  CreateWebhookOptions,
  CreateWebhookRequestOptions,
  CreateWebhookResponse,
  CreateWebhookResponseSuccess,
} from './interfaces/create-webhook-options.interface';
import type {
  GetWebhookResponse,
  GetWebhookResponseSuccess,
} from './interfaces/get-webhook.interface';
import type {
  ListWebhooksOptions,
  ListWebhooksResponse,
  ListWebhooksResponseSuccess,
} from './interfaces/list-webhooks.interface';
import type {
  RemoveWebhookResponse,
  RemoveWebhookResponseSuccess,
} from './interfaces/remove-webhook.interface';

interface Headers {
  id: string;
  timestamp: string;
  signature: string;
}

interface VerifyWebhookOptions {
  payload: string;
  headers: Headers;
  webhookSecret: string;
}

export class Webhooks {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateWebhookOptions,
    options: CreateWebhookRequestOptions = {},
  ): Promise<CreateWebhookResponse> {
    const data = await this.resend.post<CreateWebhookResponseSuccess>(
      '/webhooks',
      payload,
      options,
    );
    return data;
  }

  async get(id: string): Promise<GetWebhookResponse> {
    const data = await this.resend.get<GetWebhookResponseSuccess>(
      `/webhooks/${id}`,
    );

    return data;
  }

  async list(options: ListWebhooksOptions = {}): Promise<ListWebhooksResponse> {
    const queryString = buildPaginationQuery(options);
    const url = queryString ? `/webhooks?${queryString}` : '/webhooks';

    const data = await this.resend.get<ListWebhooksResponseSuccess>(url);
    return data;
  }

  async remove(id: string): Promise<RemoveWebhookResponse> {
    const data = await this.resend.delete<RemoveWebhookResponseSuccess>(
      `/webhooks/${id}`,
    );
    return data;
  }

  verify(payload: VerifyWebhookOptions) {
    const webhook = new Webhook(payload.webhookSecret);
    return webhook.verify(payload.payload, {
      'svix-id': payload.headers.id,
      'svix-timestamp': payload.headers.timestamp,
      'svix-signature': payload.headers.signature,
    });
  }
}
