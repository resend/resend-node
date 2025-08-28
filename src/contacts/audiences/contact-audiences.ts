import { createPaginationQuery } from '../../common/utils/create-pagination-query';
import { formatPaginatedResponse } from '../../common/utils/format-paginated-response';
import type { Resend } from '../../resend';
import type {
  AddContactAudiencesOptions,
  AddContactAudiencesResponse,
  AddContactAudiencesResponseSuccess,
} from './interfaces/add-contact-audience.interface';
import type {
  ListContactAudiencesApiResponseSuccess,
  ListContactAudiencesOptions,
  ListContactAudiencesResponse,
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
        rateLimiting: null,
        error: {
          message: 'Missing `id` or `email` field.',
          name: 'missing_required_field',
        },
      };
    }

    const identifier = options.email ? options.email : options.contactId;
    const query = createPaginationQuery(options);

    const data = await this.resend.get<ListContactAudiencesApiResponseSuccess>(
      `/contacts/${identifier}/audiences`,
      query,
    );
    return formatPaginatedResponse(data);
  }

  async add(
    options: AddContactAudiencesOptions,
  ): Promise<AddContactAudiencesResponse> {
    if (!options.contactId && !options.email) {
      return {
        data: null,
        rateLimiting: null,
        error: {
          message: 'Missing `id` or `email` field.',
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
        rateLimiting: null,
        error: {
          message: 'Missing `id` or `email` field.',
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
