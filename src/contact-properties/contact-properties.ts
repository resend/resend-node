import type { RequestOptions } from '../common/interfaces/request-options.interface';
import { buildPaginationUrl } from '../common/utils/build-pagination-query';
import {
  parseContactPropertyFromApi,
  parseContactPropertyToApiOptions,
} from '../common/utils/parse-contact-properties-to-api-options';
import { path } from '../common/utils/path';
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
    requestOptions: RequestOptions = {},
  ): Promise<CreateContactPropertyResponse> {
    const apiOptions = parseContactPropertyToApiOptions(options);
    const data = await this.resend.post<CreateContactPropertyResponseSuccess>(
      '/contact-properties',
      apiOptions,
      requestOptions,
    );
    return data;
  }

  async list(
    options: ListContactPropertiesOptions = {},
    requestOptions: RequestOptions = {},
  ): Promise<ListContactPropertiesResponse> {
    const url = buildPaginationUrl('/contact-properties', options);

    const response =
      await this.resend.get<ListContactPropertiesResponseSuccess>(
        url,
        requestOptions,
      );

    if (response.data) {
      return {
        data: {
          ...response.data,
          data: response.data.data.map((apiContactProperty) =>
            parseContactPropertyFromApi(apiContactProperty),
          ),
        },
        headers: response.headers,
        error: null,
      };
    }

    return response;
  }

  async get(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<GetContactPropertyResponse> {
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
    const response = await this.resend.get<GetContactPropertyResponseSuccess>(
      path`/contact-properties/${id}`,
      requestOptions,
    );

    if (response.data) {
      return {
        data: {
          object: 'contact_property',
          ...parseContactPropertyFromApi(response.data),
        },
        headers: response.headers,
        error: null,
      };
    }

    return response;
  }

  async update(
    payload: UpdateContactPropertyOptions,
    requestOptions: RequestOptions = {},
  ): Promise<UpdateContactPropertyResponse> {
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

    const apiOptions = parseContactPropertyToApiOptions(payload);
    const data = await this.resend.patch<UpdateContactPropertyResponseSuccess>(
      path`/contact-properties/${payload.id}`,
      apiOptions,
      requestOptions,
    );
    return data;
  }

  async remove(
    id: string,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveContactPropertyResponse> {
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
    const data = await this.resend.delete<RemoveContactPropertyResponseSuccess>(
      path`/contact-properties/${id}`,
      undefined,
      requestOptions,
    );
    return data;
  }
}
