import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import { parseEventToApiOptions } from '../common/utils/parse-automation-to-api-options';
import type { Resend } from '../resend';
import type {
  CreateEventOptions,
  CreateEventResponse,
  CreateEventResponseSuccess,
} from './interfaces/create-event.interface';
import type {
  GetEventResponse,
  GetEventResponseSuccess,
} from './interfaces/get-event.interface';
import type {
  ListEventsOptions,
  ListEventsResponse,
  ListEventsResponseSuccess,
} from './interfaces/list-events.interface';
import type {
  RemoveEventResponse,
  RemoveEventResponseSuccess,
} from './interfaces/remove-event.interface';
import type {
  SendEventOptions,
  SendEventResponse,
  SendEventResponseSuccess,
} from './interfaces/send-event.interface';
import type {
  UpdateEventOptions,
  UpdateEventResponse,
  UpdateEventResponseSuccess,
} from './interfaces/update-event.interface';

export class Events {
  constructor(private readonly resend: Resend) {}

  async send(payload: SendEventOptions): Promise<SendEventResponse> {
    const data = await this.resend.post<SendEventResponseSuccess>(
      '/events/send',
      parseEventToApiOptions(payload),
    );

    return data;
  }

  async create(payload: CreateEventOptions): Promise<CreateEventResponse> {
    const data = await this.resend.post<CreateEventResponseSuccess>(
      '/events',
      payload,
    );

    return data;
  }

  async get(identifier: string): Promise<GetEventResponse> {
    const data = await this.resend.get<GetEventResponseSuccess>(
      `/events/${encodeURIComponent(identifier)}`,
    );
    return data;
  }

  async list(options: ListEventsOptions = {}): Promise<ListEventsResponse> {
    const queryString = buildPaginationQuery(options);
    const url = queryString ? `/events?${queryString}` : '/events';

    const data = await this.resend.get<ListEventsResponseSuccess>(url);
    return data;
  }

  async update(
    identifier: string,
    payload: UpdateEventOptions,
  ): Promise<UpdateEventResponse> {
    const data = await this.resend.patch<UpdateEventResponseSuccess>(
      `/events/${encodeURIComponent(identifier)}`,
      payload,
    );
    return data;
  }

  async remove(identifier: string): Promise<RemoveEventResponse> {
    const data = await this.resend.delete<RemoveEventResponseSuccess>(
      `/events/${encodeURIComponent(identifier)}`,
    );
    return data;
  }
}
