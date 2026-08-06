import { buildPaginationQuery } from '../../common/utils/build-pagination-query';
import type { Resend } from '../../resend';
import type {
  GetWebhookEventOptions,
  GetWebhookEventResponse,
  GetWebhookEventResponseSuccess,
} from '../interfaces/get-webhook-event.interface';
import type {
  ListWebhookEventsOptions,
  ListWebhookEventsResponse,
  ListWebhookEventsResponseSuccess,
} from '../interfaces/list-webhook-events.interface';
import { Attempts } from './attempts/attempts';

export class Events {
  readonly attempts: Attempts;

  constructor(private readonly resend: Resend) {
    this.attempts = new Attempts(resend);
  }

  async list(
    options: ListWebhookEventsOptions,
  ): Promise<ListWebhookEventsResponse> {
    const { webhookId } = options;

    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/webhooks/${webhookId}/events?${queryString}`
      : `/webhooks/${webhookId}/events`;

    const data = await this.resend.get<ListWebhookEventsResponseSuccess>(url);
    return data;
  }

  async get(options: GetWebhookEventOptions): Promise<GetWebhookEventResponse> {
    const { webhookId, eventId } = options;

    const data = await this.resend.get<GetWebhookEventResponseSuccess>(
      `/webhooks/${webhookId}/events/${eventId}`,
    );
    return data;
  }
}
