import { buildPaginationQuery } from '../../common/utils/build-pagination-query';
import type { Resend } from '../../resend';
import type {
  GetAttachmentOptions,
  GetAttachmentResponse,
  GetAttachmentResponseSuccess,
} from './interfaces/get-attachment.interface';
import type {
  ListAttachmentsApiResponse,
  ListAttachmentsOptions,
  ListAttachmentsResponse,
} from './interfaces/list-attachments.interface';

export class Receiving {
  constructor(private readonly resend: Resend) {}

  async get(options: GetAttachmentOptions): Promise<GetAttachmentResponse> {
    const { emailId, id } = options;

    const data = await this.resend.get<GetAttachmentResponseSuccess>(
      `/emails/receiving/${emailId}/attachments/${id}`,
    );

    return data;
  }

  async list(
    options: ListAttachmentsOptions,
  ): Promise<ListAttachmentsResponse> {
    const { emailId } = options;

    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/emails/receiving/${emailId}/attachments?${queryString}`
      : `/emails/receiving/${emailId}/attachments`;

    const data = await this.resend.get<ListAttachmentsApiResponse>(url);

    return data;
  }
}
