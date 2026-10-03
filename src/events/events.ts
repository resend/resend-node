import type { RequestOptions } from '../common/interfaces/request-options.interface';
import { buildPaginationUrl } from '../common/utils/build-pagination-query';
import { parseEventToApiOptions } from '../common/utils/parse-automation-to-api-options';
import { path } from '../common/utils/path';
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

  async send(
    payload: SendEventOptions,
    requestOptions: RequestOptions = {},
  ): Promise<SendEventResponse> {
    const data = await this.resend.post<SendEventResponseSuccess>(
      '/events/send',
      parseEventToApiOptions(payload),
      requestOptions,
    );

    return data;
  }

  async create(
    payload: CreateEventOptions,
    requestOptions: RequestOptions = {},
  ): Promise<CreateEventResponse> {
    const data = await this.resend.post<CreateEventResponseSuccess>(
      '/events',
      payload,
      requestOptions,
    );

    return data;
  }

  async get(
    identifier: string,
    requestOptions: RequestOptions = {},
  ): Promise<GetEventResponse> {
    const data = await this.resend.get<GetEventResponseSuccess>(
      path`/events/${identifier}`,
      requestOptions,
    );
    return data;
  }

  async list(
    options: ListEventsOptions = {},
    requestOptions: RequestOptions = {},
  ): Promise<ListEventsResponse> {
    const url = buildPaginationUrl('/events', options);
    const data = await this.resend.get<ListEventsResponseSuccess>(
      url,
      requestOptions,
    );
    return data;
  }

  async update(
    identifier: string,
    payload: UpdateEventOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateEventResponse> {
    const data = await this.resend.patch<UpdateEventResponseSuccess>(
      path`/events/${identifier}`,
      payload,
      requestOptions,
    );
    return data;
  }

  async remove(
    identifier: string,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveEventResponse> {
    const data = await this.resend.delete<RemoveEventResponseSuccess>(
      path`/events/${identifier}`,
      undefined,
      requestOptions,
    );
    return data;
  }
}
