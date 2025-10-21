import { buildPaginationQuery } from '../common/utils/build-pagination-query';
import {
  parseContactPropertyFromApi,
  parseContactPropertyToApiOptions,
} from '../common/utils/parse-contact-properties-to-api-options';
import type { Resend } from '../resend';
import type {
  CreateContactPropertyOptions,
  CreateContactPropertyResponse,
  CreateContactPropertyResponseSuccess,
} from './interfaces/create-contact-property-options.interface';
import type {
  RemoveContactPropertyResponse,
  RemoveContactPropertyResponseSuccess,
} from './interfaces/delete-contact-property-options.interface';
import type {
  GetContactPropertyResponse,
  GetContactPropertyResponseSuccess,
} from './interfaces/get-contact-property.interface';
import type {
  ListContactPropertiesOptions,
  ListContactPropertiesResponse,
  ListContactPropertiesResponseSuccess,
} from './interfaces/list-contact-properties-options.interface';
import type {
  UpdateContactPropertyOptions,
  UpdateContactPropertyResponse,
  UpdateContactPropertyResponseSuccess,
} from './interfaces/update-contact-property-options.interface';

export class ContactProperties {
  constructor(private readonly resend: Resend) {}

  async create(
    options: CreateContactPropertyOptions,
  ): Promise<CreateContactPropertyResponse> {
    const apiOptions = parseContactPropertyToApiOptions(options);
    const data = await this.resend.post<CreateContactPropertyResponseSuccess>(
      '/contact-properties',
      apiOptions,
    );
    return data;
  }

  async list(
    options: ListContactPropertiesOptions = {},
  ): Promise<ListContactPropertiesResponse> {
    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/contact-properties?${queryString}`
      : '/contact-properties';

    const response =
      await this.resend.get<ListContactPropertiesResponseSuccess>(url);

    if (response.data) {
      return {
        data: {
          ...response.data,
          data: response.data.data.map((apiContactProperty) =>
            parseContactPropertyFromApi(apiContactProperty),
          ),
        },
        error: null,
      };
    }

    return response;
  }

  async get(id: string): Promise<GetContactPropertyResponse> {
    const response = await this.resend.get<GetContactPropertyResponseSuccess>(
      `/contact-properties/${id}`,
    );

    if (response.data) {
      return {
        data: parseContactPropertyFromApi(response.data),
        error: null,
      };
    }

    return response;
  }

  async update(
    payload: UpdateContactPropertyOptions,
  ): Promise<UpdateContactPropertyResponse> {
    if (!payload.id) {
      return {
        data: null,
        error: {
          message: 'Missing `id` field.',
          statusCode: null,
          name: 'missing_required_field',
        },
      };
    }

    const apiOptions = parseContactPropertyToApiOptions(payload);
    const data = await this.resend.patch<UpdateContactPropertyResponseSuccess>(
      `/contact-properties/${payload.id}`,
      apiOptions,
    );
    return data;
  }

  async delete(id: string): Promise<RemoveContactPropertyResponse> {
    const data = await this.resend.delete<RemoveContactPropertyResponseSuccess>(
      `/contact-properties/${id}`,
    );
    return data;
  }
}
