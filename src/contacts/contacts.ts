import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
import type {
  CreateContactOptions,
  CreateContactRequestOptions,
  CreateContactResponse,
  CreateContactResponseSuccess,
} from './interfaces/create-contact-options.interface';
import type {
  GetContactOptions,
  GetContactResponse,
  GetContactResponseSuccess,
} from './interfaces/get-contact.interface';
import type {
  ListAudienceContactsOptions,
  ListContactsOptions,
  ListContactsResponse,
  ListContactsResponseSuccess,
} from './interfaces/list-contacts.interface';
import type {
  RemoveContactOptions,
  RemoveContactsResponse,
  RemoveContactsResponseSuccess,
} from './interfaces/remove-contact.interface';
import type {
  UpdateContactOptions,
  UpdateContactResponse,
  UpdateContactResponseSuccess,
} from './interfaces/update-contact.interface';
import { ContactSegments } from './segments/contact-segments';
import { ContactTopics } from './topics/contact-topics';

export class Contacts {
  readonly topics: ContactTopics;
  readonly segments: ContactSegments;

  constructor(private readonly resend: Resend) {
    this.topics = new ContactTopics(this.resend);
    this.segments = new ContactSegments(this.resend);
  }

  async create(
    payload: CreateContactOptions,
    options: CreateContactRequestOptions = {},
  ): Promise<CreateContactResponse> {
    if (!payload.audienceId) {
      const data = await this.resend.post<CreateContactResponseSuccess>(
        '/contacts',
        {
          unsubscribed: payload.unsubscribed,
          email: payload.email,
          first_name: payload.firstName,
          last_name: payload.lastName,
        },
        options,
      );
      return data;
    }

    const data = await this.resend.post<CreateContactResponseSuccess>(
      `/audiences/${payload.audienceId}/contacts`,
      {
        unsubscribed: payload.unsubscribed,
        email: payload.email,
        first_name: payload.firstName,
        last_name: payload.lastName,
      },
      options,
    );
    return data;
  }

  async list(
    options: ListContactsOptions | ListAudienceContactsOptions = {},
  ): Promise<ListContactsResponse> {
    if (!('audienceId' in options) || options.audienceId === undefined) {
      const queryString = buildPaginationQuery(options);
      const url = queryString ? `/contacts?${queryString}` : '/contacts';
      const data = await this.resend.get<ListContactsResponseSuccess>(url);
      return data;
    }

    const { audienceId, ...paginationOptions } = options;
    const queryString = buildPaginationQuery(paginationOptions);
    const url = queryString
      ? `/audiences/${audienceId}/contacts?${queryString}`
      : `/audiences/${audienceId}/contacts`;
    const data = await this.resend.get<ListContactsResponseSuccess>(url);
    return data;
  }

  async get(options: GetContactOptions): Promise<GetContactResponse> {
    if (typeof options === 'string') {
      return this.resend.get<GetContactResponseSuccess>(`/contacts/${options}`);
    }

    if (!options.id && !options.email) {
      return {
        data: null,
        headers: null,
        error: {
          message: 'Missing `id` or `email` field.',
          statusCode: null,
          name: 'missing_required_field',
        },
      };
    }

    if (!options.audienceId) {
      return this.resend.get<GetContactResponseSuccess>(
        `/contacts/${options?.email ? options?.email : options?.id}`,
      );
    }

    return this.resend.get<GetContactResponseSuccess>(
      `/audiences/${options.audienceId}/contacts/${options?.email ? options?.email : options?.id}`,
    );
  }

  async update(options: UpdateContactOptions): Promise<UpdateContactResponse> {
    if (!options.id && !options.email) {
      return {
        data: null,
        headers: null,
        error: {
          message: 'Missing `id` or `email` field.',
          statusCode: null,
          name: 'missing_required_field',
        },
      };
    }

    if (!options.audienceId) {
      const data = await this.resend.patch<UpdateContactResponseSuccess>(
        `/contacts/${options?.email ? options?.email : options?.id}`,
        {
          unsubscribed: options.unsubscribed,
          first_name: options.firstName,
          last_name: options.lastName,
        },
      );
      return data;
    }

    const data = await this.resend.patch<UpdateContactResponseSuccess>(
      `/audiences/${options.audienceId}/contacts/${options?.email ? options?.email : options?.id}`,
      {
        unsubscribed: options.unsubscribed,
        first_name: options.firstName,
        last_name: options.lastName,
      },
    );
    return data;
  }

  async remove(payload: RemoveContactOptions): Promise<RemoveContactsResponse> {
    if (typeof payload === 'string') {
      return this.resend.delete<RemoveContactsResponseSuccess>(
        `/contacts/${payload}`,
      );
    }

    if (!payload.id && !payload.email) {
      return {
        data: null,
        headers: null,
        error: {
          message: 'Missing `id` or `email` field.',
          statusCode: null,
          name: 'missing_required_field',
        },
      };
    }

    if (!payload.audienceId) {
      return this.resend.delete<RemoveContactsResponseSuccess>(
        `/contacts/${payload?.email ? payload?.email : payload?.id}`,
      );
    }

    return this.resend.delete<RemoveContactsResponseSuccess>(
      `/audiences/${payload.audienceId}/contacts/${
        payload?.email ? payload?.email : payload?.id
      }`,
    );
  }
}
