import type { RequestOptions } from '../../../common/interfaces/request-options.interface';
import { buildPaginationUrl } from '../../../common/utils/build-pagination-query';
import type { Resend } from '../../../resend';
import type {
  GetAttachmentOptions,
  GetAttachmentResponse,
  GetAttachmentResponseSuccess,
  ListAttachmentsOptions,
  ListAttachmentsResponse,
  ListAttachmentsResponseSuccess,
} from '../../attachments/interfaces';

export class Attachments {
  constructor(private readonly resend: Resend) {}

  async get(
    options: GetAttachmentOptions,
    requestOptions: RequestOptions = {},
  ): Promise<GetAttachmentResponse> {
    const { emailId, id } = options;

    const data = await this.resend.get<GetAttachmentResponseSuccess>(
      `/emails/receiving/${emailId}/attachments/${id}`,
      requestOptions,
    );

    return data;
  }

  async list(
    options: ListAttachmentsOptions,
    requestOptions: RequestOptions = {},
  ): Promise<ListAttachmentsResponse> {
    const { emailId } = options;

    const url = buildPaginationUrl(
      `/emails/receiving/${emailId}/attachments`,
      options,
    );

    const data = await this.resend.get<ListAttachmentsResponseSuccess>(
      url,
      requestOptions,
    );

    return data;
  }
}
