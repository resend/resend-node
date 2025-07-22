import type { Resend } from '../../resend';
import type {
  GetContactTopicsOptions,
  GetContactTopicsResponse,
  GetContactTopicsResponseSuccess,
} from './interfaces/get-contact-topics.interface';
import type {
  UpdateContactTopicsOptions,
  UpdateContactTopicsResponse,
  UpdateContactTopicsResponseSuccess,
} from './interfaces/update-contact-topics.interface';

export class ContactTopics {
  constructor(private readonly resend: Resend) {}

  async update(
    payload: UpdateContactTopicsOptions,
  ): Promise<UpdateContactTopicsResponse> {
    if (!payload.id && !payload.email) {
      return {
        data: null,
        error: {
          message: 'Missing `id` or `email` field.',
          name: 'missing_required_field',
        },
      };
    }

    const identifier = payload.email ? payload.email : payload.id;
    const data = await this.resend.patch<UpdateContactTopicsResponseSuccess>(
      `/contacts/${identifier}/topics`,
      payload.topics,
    );

    return data;
  }

  async get(
    options: GetContactTopicsOptions,
  ): Promise<GetContactTopicsResponse> {
    if (!options.id && !options.email) {
      return {
        data: null,
        error: {
          message: 'Missing `id` or `email` field.',
          name: 'missing_required_field',
        },
      };
    }

    const identifier = options.email ? options.email : options.id;
    const data = await this.resend.get<GetContactTopicsResponseSuccess>(
      `/contacts/${identifier}/topics`,
    );

    return data;
  }
}
