import { Resend } from '../resend';
import {
  CreateContactOptions,
  CreateContactRequestOptions,
  CreateContactResponse,
  CreateContactResponseSuccess,
  GetContactResponse,
  GetContactResponseSuccess,
  ListContactsResponse,
  ListContactsResponseSuccess,
  RemoveContactsResponse,
  RemoveContactsResponseSuccess,
} from './interfaces';

export class Contacts {
  constructor(private readonly resend: Resend) {}

  async create(
    payload: CreateContactOptions,
    options: CreateContactRequestOptions = {},
  ): Promise<CreateContactResponse> {
    const data = await this.resend.post<CreateContactResponseSuccess>(
      `/audiences/${payload.audience_id}/contacts`,
      payload,
      options,
    );
    return data;
  }

  async list({
    audience_id,
  }: {
    audience_id: string;
  }): Promise<ListContactsResponse> {
    const data = await this.resend.get<ListContactsResponseSuccess>(
      `/audiences/${audience_id}/contacts`,
    );
    return data;
  }

  async get({
    audience_id,
    id,
  }: {
    audience_id: string;
    id: string;
  }): Promise<GetContactResponse> {
    const data = await this.resend.get<GetContactResponseSuccess>(
      `/audiences/${audience_id}/contacts/${id}`,
    );
    return data;
  }

  async remove({
    audience_id,
    id,
  }: {
    audience_id: string;
    id: string;
  }): Promise<RemoveContactsResponse> {
    const data = await this.resend.delete<RemoveContactsResponseSuccess>(
      `/audiences/${audience_id}/contacts/${id}`,
    );
    return data;
  }
}
