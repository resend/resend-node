import { buildPaginationQuery } from '../../common/utils/build-pagination-query';
import type { Resend } from '../../resend';
import type {
  AddContactAudiencesOptions,
  AddContactAudiencesResponse,
  AddContactAudiencesResponseSuccess,
} from './interfaces/add-contact-audience.interface';
import type {
  ListContactAudiencesOptions,
  ListContactAudiencesResponse,
  ListContactAudiencesResponseSuccess,
} from './interfaces/list-contact-audiences.interface';
import type {
  RemoveContactAudiencesOptions,
  RemoveContactAudiencesResponse,
  RemoveContactAudiencesResponseSuccess,
} from './interfaces/remove-contact-audience.interface';

export class ContactAudiences {
  constructor(private readonly resend: Resend) {}

  async list(
    options: ListContactAudiencesOptions,
  ): Promise<ListContactAudiencesResponse> {
    if (!options.contactId && !options.email) {
      return {
        data: null,
        error: {
          message: 'Missing `id` or `email` field.',
          statusCode: null,
          name: 'missing_required_field',
        },
      };
    }

    const identifier = options.email ? options.email : options.contactId;
    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/contacts/${identifier}/audiences?${queryString}`
      : `/contacts/${identifier}/audiences`;

    const data =
      await this.resend.get<ListContactAudiencesResponseSuccess>(url);
    return data;
  }

  async add(
    options: AddContactAudiencesOptions,
  ): Promise<AddContactAudiencesResponse> {
    if (!options.contactId && !options.email) {
      return {
        data: null,
        error: {
          message: 'Missing `id` or `email` field.',
          statusCode: null,
          name: 'missing_required_field',
        },
      };
    }

    const identifier = options.email ? options.email : options.contactId;
    return this.resend.post<AddContactAudiencesResponseSuccess>(
      `/contacts/${identifier}/audiences/${options.audienceId}`,
    );
  }

  async remove(
    options: RemoveContactAudiencesOptions,
  ): Promise<RemoveContactAudiencesResponse> {
    if (!options.contactId && !options.email) {
      return {
        data: null,
        error: {
          message: 'Missing `id` or `email` field.',
          statusCode: null,
          name: 'missing_required_field',
        },
      };
    }

    const identifier = options.email ? options.email : options.contactId;
    return this.resend.delete<RemoveContactAudiencesResponseSuccess>(
      `/contacts/${identifier}/audiences/${options.audienceId}`,
    );
  }
}
