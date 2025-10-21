import { buildPaginationQuery } from '../../common/utils/build-pagination-query';
import type { Resend } from '../../resend';
import type {
  ListContactTopicsOptions,
  ListContactTopicsResponse,
  ListContactTopicsResponseSuccess,
} from './interfaces/list-contact-topics.interface';
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
          statusCode: null,
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

  async list(
    options: ListContactTopicsOptions,
  ): Promise<ListContactTopicsResponse> {
    if (!options.id && !options.email) {
      return {
        data: null,
        error: {
          message: 'Missing `id` or `email` field.',
          statusCode: null,
          name: 'missing_required_field',
        },
      };
    }

    const identifier = options.email ? options.email : options.id;
    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/contacts/${identifier}/topics?${queryString}`
      : `/contacts/${identifier}/topics`;

    const data = await this.resend.get<ListContactTopicsResponseSuccess>(url);
    return data;
  }
}
