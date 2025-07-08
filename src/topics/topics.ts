import type { Resend } from '../resend';
import type {
  CreateTopicOptions,
  CreateTopicResponse,
  CreateTopicResponseSuccess,
} from './interfaces/create-topic-options.interface';
import type {
  GetTopicResponse,
  GetTopicResponseSuccess,
} from './interfaces/get-contact.interface';
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

  async create(payload: CreateTopicOptions): Promise<CreateTopicResponse> {
    const data = await this.resend.post<CreateTopicResponseSuccess>(
      '/topics',
      payload,
    );

    return data;
  }

  async list(): Promise<ListTopicsResponse> {
    const data = await this.resend.get<ListTopicsResponseSuccess>('/topics');

    return data;
  }

  async get(id: string): Promise<GetTopicResponse> {
    if (!id) {
      return {
        data: null,
        error: {
          message: 'Missing `id` field.',
          name: 'missing_required_field',
        },
      };
    }
    const data = await this.resend.get<GetTopicResponseSuccess>(
      `/topics/${id}`,
    );

    return data;
  }

  async update(payload: UpdateTopicOptions): Promise<UpdateTopicResponse> {
    if (!payload.id) {
      return {
        data: null,
        error: {
          message: 'Missing `id` field.',
          name: 'missing_required_field',
        },
      };
    }

    const data = await this.resend.patch<UpdateTopicResponseSuccess>(
      `/topics/${payload.id}`,
      payload,
    );

    return data;
  }

  async remove(id: string): Promise<RemoveTopicResponse> {
    if (!id) {
      return {
        data: null,
        error: {
          message: 'Missing `id` field.',
          name: 'missing_required_field',
        },
      };
    }

    const data = await this.resend.delete<RemoveTopicResponseSuccess>(
      `/topics/${id}`,
    );

    return data;
  }
}
