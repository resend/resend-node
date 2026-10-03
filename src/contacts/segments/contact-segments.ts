import type { RequestOptions } from '../../common/interfaces/request-options.interface';
import { buildPaginationUrl } from '../../common/utils/build-pagination-query';
import { path } from '../../common/utils/path';
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
    requestOptions: RequestOptions = {},
  ): Promise<ListContactSegmentsResponse> {
    if (!options.contactId && !options.email) {
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

    const identifier = options.email ? options.email : options.contactId;
    const url = buildPaginationUrl(
      path`/contacts/${identifier}/segments`,
      options,
    );

    const data = await this.resend.get<ListContactSegmentsResponseSuccess>(
      url,
      requestOptions,
    );
    return data;
  }

  async add(
    options: AddContactSegmentOptions,
    requestOptions: RequestOptions = {},
  ): Promise<AddContactSegmentResponse> {
    if (!options.contactId && !options.email) {
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

    const identifier = options.email ? options.email : options.contactId;
    return this.resend.post<AddContactSegmentResponseSuccess>(
      path`/contacts/${identifier}/segments/${options.segmentId}`,
      undefined,
      requestOptions,
    );
  }

  async remove(
    options: RemoveContactSegmentOptions,
    requestOptions: RequestOptions = {},
  ): Promise<RemoveContactSegmentResponse> {
    if (!options.contactId && !options.email) {
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

    const identifier = options.email ? options.email : options.contactId;
    return this.resend.delete<RemoveContactSegmentResponseSuccess>(
      path`/contacts/${identifier}/segments/${options.segmentId}`,
      undefined,
      requestOptions,
    );
  }
}
