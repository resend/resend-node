import { buildPaginationQuery } from '../../../common/utils/build-pagination-query';
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

    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/webhooks/${webhookId}/events/${eventId}/attempts?${queryString}`
      : `/webhooks/${webhookId}/events/${eventId}/attempts`;

    const data =
      await this.resend.get<ListWebhookEventAttemptsResponseSuccess>(url);
    return data;
  }
}
