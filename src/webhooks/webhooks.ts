import { Webhook } from 'standardwebhooks';
import type { RequestOptions } from '../common/interfaces/request-options.interface';
import { buildPaginationUrl } from '../common/utils/build-pagination-query';
import { path } from '../common/utils/path';
import type { Resend } from '../resend';
import { Events } from './events/events';
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
import type {
  RotateWebhookSigningSecretResponse,
  RotateWebhookSigningSecretResponseSuccess,
} from './interfaces/rotate-webhook-signing-secret.interface';
import type {
  UpdateWebhookOptions,
  UpdateWebhookResponse,
  UpdateWebhookResponseSuccess,
} from './interfaces/update-webhook.interface';
import type { WebhookEventPayload } from './interfaces/webhook-event.interface';

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
  readonly events: Events;

  constructor(private readonly resend: Resend) {
    this.events = new Events(resend);
  }

  async create(
    payload: CreateWebhookOptions,
    requestOptions: CreateWebhookRequestOptions = {},
  ): Promise<CreateWebhookResponse> {
    const data = await this.resend.post<CreateWebhookResponseSuccess>(
      '/webhooks',
      payload,
      requestOptions,
    );
    return data;
  }

  async get(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<GetWebhookResponse> {
    const data = await this.resend.get<GetWebhookResponseSuccess>(
      path`/webhooks/${id}`,
      requestOptions,
    );

    return data;
  }

  async list(
    options: ListWebhooksOptions = {},
    requestOptions: RequestOptions = {},
  ): Promise<ListWebhooksResponse> {
    const url = buildPaginationUrl('/webhooks', options);

    const data = await this.resend.get<ListWebhooksResponseSuccess>(
      url,
      requestOptions,
    );
    return data;
  }

  async update(
    id: string,
    payload: UpdateWebhookOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateWebhookResponse> {
    const data = await this.resend.patch<UpdateWebhookResponseSuccess>(
      path`/webhooks/${id}`,
      payload,
      requestOptions,
    );
    return data;
  }

  async remove(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveWebhookResponse> {
    const data = await this.resend.delete<RemoveWebhookResponseSuccess>(
      path`/webhooks/${id}`,
      undefined,
      requestOptions,
    );
    return data;
  }

  async rotateSigningSecret(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<RotateWebhookSigningSecretResponse> {
    const data =
      await this.resend.post<RotateWebhookSigningSecretResponseSuccess>(
        path`/webhooks/${id}/signing-secret/rotate`,
        undefined,
        requestOptions,
      );
    return data;
  }

  verify(payload: VerifyWebhookOptions): WebhookEventPayload {
    const webhook = new Webhook(payload.webhookSecret);
    return webhook.verify(payload.payload, {
      'webhook-id': payload.headers.id,
      'webhook-timestamp': payload.headers.timestamp,
      'webhook-signature': payload.headers.signature,
    }) as WebhookEventPayload;
  }
}
