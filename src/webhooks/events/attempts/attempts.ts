import { buildPaginationUrl } from '../../../common/utils/build-pagination-query';
import { path } from '../../../common/utils/path';
import type { Resend } from '../../../resend';
import type {
  ListWebhookEventAttemptsOptions,
  ListWebhookEventAttemptsResponse,
  ListWebhookEventAttemptsResponseSuccess,
} from '../../interfaces/list-webhook-event-attempts.interface';

export class Attempts {
  constructor(private readonly resend: Resend) {}

  async list(
    options: ListWebhookEventAttemptsOptions,
  ): Promise<ListWebhookEventAttemptsResponse> {
    const { webhookId, eventId } = options;

    const url = buildPaginationUrl(
      path`/webhooks/${webhookId}/events/${eventId}/attempts`,
      options,
    );

    const data =
      await this.resend.get<ListWebhookEventAttemptsResponseSuccess>(url);
    return data;
  }
}
