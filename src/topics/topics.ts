import type { RequestOptions } from '../common/interfaces/request-options.interface';
import { path } from '../common/utils/path';
import type { Resend } from '../resend';
import type {
  CreateTopicOptions,
  CreateTopicResponse,
  CreateTopicResponseSuccess,
} from './interfaces/create-topic-options.interface';
import type {
  GetTopicResponse,
  GetTopicResponseSuccess,
} from './interfaces/get-topic.interface';
import type {
  ListTopicsResponse,
  ListTopicsResponseSuccess,
} from './interfaces/list-topics.interface';
import type {
  RemoveTopicResponse,
  RemoveTopicResponseSuccess,
} from './interfaces/remove-topic.interface';
import type {
  UpdateTopicOptions,
  UpdateTopicResponse,
  UpdateTopicResponseSuccess,
} from './interfaces/update-topic.interface';

export class Topics {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateTopicOptions,
    requestOptions: RequestOptions = {},
  ): Promise<CreateTopicResponse> {
    const { defaultSubscription, ...body } = payload;

    const data = await this.resend.post<CreateTopicResponseSuccess>(
      '/topics',
      {
        ...body,
        default_subscription: defaultSubscription,
      },
      requestOptions,
    );

    return data;
  }

  async list(requestOptions: RequestOptions = {}): Promise<ListTopicsResponse> {
    const data = await this.resend.get<ListTopicsResponseSuccess>(
      '/topics',
      requestOptions,
    );

    return data;
  }

  async get(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<GetTopicResponse> {
    if (!id) {
      return {
        data: null,
        headers: null,
        error: {
          message: 'Missing `id` field.',
          statusCode: null,
          name: 'missing_required_field',
        },
      };
    }
    const data = await this.resend.get<GetTopicResponseSuccess>(
      path`/topics/${id}`,
      requestOptions,
    );

    return data;
  }

  async update(
    payload: UpdateTopicOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateTopicResponse> {
    if (!payload.id) {
      return {
        data: null,
        headers: null,
        error: {
          message: 'Missing `id` field.',
          statusCode: null,
          name: 'missing_required_field',
        },
      };
    }

    const data = await this.resend.patch<UpdateTopicResponseSuccess>(
      path`/topics/${payload.id}`,
      payload,
      requestOptions,
    );

    return data;
  }

  async remove(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveTopicResponse> {
    if (!id) {
      return {
        data: null,
        headers: null,
        error: {
          message: 'Missing `id` field.',
          statusCode: null,
          name: 'missing_required_field',
        },
      };
    }

    const data = await this.resend.delete<RemoveTopicResponseSuccess>(
      path`/topics/${id}`,
      undefined,
      requestOptions,
    );

    return data;
  }
}
