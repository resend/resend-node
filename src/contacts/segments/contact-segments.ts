import { buildPaginationQuery } from '../../common/utils/build-pagination-query';
import type { Resend } from '../../resend';
import type {
  AddContactSegmentOptions,
  AddContactSegmentResponse,
  AddContactSegmentResponseSuccess,
} from './interfaces/add-contact-segment.interface';
import type {
  ListContactSegmentsOptions,
  ListContactSegmentsResponse,
  ListContactSegmentsResponseSuccess,
} from './interfaces/list-contact-segments.interface';
import type {
  RemoveContactSegmentOptions,
  RemoveContactSegmentResponse,
  RemoveContactSegmentResponseSuccess,
} from './interfaces/remove-contact-segment.interface';

export class ContactSegments {
  constructor(private readonly resend: Resend) {}

  async list(
    options: ListContactSegmentsOptions,
  ): Promise<ListContactSegmentsResponse> {
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
      ? `/contacts/${identifier}/segments?${queryString}`
      : `/contacts/${identifier}/segments`;

    const data = await this.resend.get<ListContactSegmentsResponseSuccess>(url);
    return data;
  }

  async add(
    options: AddContactSegmentOptions,
  ): Promise<AddContactSegmentResponse> {
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
    return this.resend.post<AddContactSegmentResponseSuccess>(
      `/contacts/${identifier}/segments/${options.segmentId}`,
    );
  }

  async remove(
    options: RemoveContactSegmentOptions,
  ): Promise<RemoveContactSegmentResponse> {
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
    return this.resend.delete<RemoveContactSegmentResponseSuccess>(
      `/contacts/${identifier}/segments/${options.segmentId}`,
    );
  }
}
