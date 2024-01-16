import { Resend } from '../resend';
import {
  CreateContactOptions,
  CreateContactRequestOptions,
  CreateContactResponse,
  CreateContactResponseSuccess,
} from './interfaces/create-contact-options.interface';
import {
  GetContactOptions,
  GetContactResponse,
  GetContactResponseSuccess,
} from './interfaces/get-contact.interface';
import {
  ListContactsOptions,
  ListContactsResponse,
  ListContactsResponseSuccess,
} from './interfaces/list-contacts.interface';
import {
  RemoveContactOptions,
  RemoveContactsResponse,
  RemoveContactsResponseSuccess,
} from './interfaces/remove-contact.interface';
import {
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
    const data = await this.resend.get<GetContactResponseSuccess>(
      `/audiences/${options.audienceId}/contacts/${options.id}`,
    );
    return data;
  }

  async update(payload: UpdateContactOptions): Promise<UpdateContactResponse> {
    const data = await this.resend.patch<UpdateContactResponseSuccess>(
      `/audiences/${payload.audienceId}/contacts/${payload.id}`,
      {
        unsubscribed: payload.unsubscribed,
        first_name: payload.fistName,
        last_name: payload.lastName,
      },
    );
    return data;
  }

  async remove(payload: RemoveContactOptions): Promise<RemoveContactsResponse> {
    const data = await this.resend.delete<RemoveContactsResponseSuccess>(
      `/audiences/${payload.audienceId}/contacts/${
        payload?.email ? payload?.email : payload?.id
      }`,
    );
    return data;
  }
}
