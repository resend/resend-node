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

export class Contacts {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateContactOptions,
    options: CreateContactRequestOptions = {},
  ): Promise<CreateContactResponse> {
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

  async list(options: ListContactsOptions): Promise<ListContactsResponse> {
    const data = await this.resend.get<ListContactsResponseSuccess>(
      `/audiences/${options.audienceId}/contacts`,
    );
    return data;
  }

  async get(options: GetContactOptions): Promise<GetContactResponse> {
    if (!options.id && !options.email) {
      return {
        data: null,
        error: {
          message: 'Missing `id` or `email` field.',
          name: 'missing_required_field',
        },
      };
    }

    const data = await this.resend.get<GetContactResponseSuccess>(
      `/audiences/${options.audienceId}/contacts/${options?.email ? options?.email : options?.id}`,
    );
    return data;
  }

  async update(payload: UpdateContactOptions): Promise<UpdateContactResponse> {
    if (!payload.id && !payload.email) {
      return {
        data: null,
        error: {
          message: 'Missing `id` or `email` field.',
          name: 'missing_required_field',
        },
      };
    }

    const data = await this.resend.patch<UpdateContactResponseSuccess>(
      `/audiences/${payload.audienceId}/contacts/${payload?.email ? payload?.email : payload?.id}`,
      {
        unsubscribed: payload.unsubscribed,
        first_name: payload.firstName,
        last_name: payload.lastName,
      },
    );
    return data;
  }

  async remove(payload: RemoveContactOptions): Promise<RemoveContactsResponse> {
    if (!payload.id && !payload.email) {
      return {
        data: null,
        error: {
          message: 'Missing `id` or `email` field.',
          name: 'missing_required_field',
        },
      };
    }

    const data = await this.resend.delete<RemoveContactsResponseSuccess>(
      `/audiences/${payload.audienceId}/contacts/${
        payload?.email ? payload?.email : payload?.id
      }`,
    );
    return data;
  }
}
