import { buildPaginationQuery } from '../../common/utils/build-pagination-query';
import type { Resend } from '../../resend';
import type {
  GetAttachmentOptions,
  GetAttachmentResponse,
  GetAttachmentResponseSuccess,
  ListAttachmentsOptions,
  ListAttachmentsResponse,
  ListAttachmentsResponseSuccess,
} from './interfaces';

export class Attachments {
  constructor(private readonly resend: Resend) {}

  async get(options: GetAttachmentOptions): Promise<GetAttachmentResponse> {
    const { emailId, id } = options;

    const data = await this.resend.get<GetAttachmentResponseSuccess>(
      `/emails/${encodeURIComponent(emailId)}/attachments/${encodeURIComponent(id)}`,
    );

    return data;
  }

  async list(
    options: ListAttachmentsOptions,
  ): Promise<ListAttachmentsResponse> {
    const { emailId } = options;

    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/emails/${encodeURIComponent(emailId)}/attachments?${queryString}`
      : `/emails/${encodeURIComponent(emailId)}/attachments`;

    const data = await this.resend.get<ListAttachmentsResponseSuccess>(url);

    return data;
  }
}
