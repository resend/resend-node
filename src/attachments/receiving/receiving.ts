import type { Resend } from '../../resend';
import type {
  GetAttachmentOptions,
  GetAttachmentResponse,
  GetAttachmentResponseSuccess,
} from './interfaces/get-attachment.interface';
import type {
  ListAttachmentsOptions,
  ListAttachmentsResponse,
  ListAttachmentsResponseSuccess,
} from './interfaces/list-attachments.interface';

export class Receiving {
  constructor(private readonly resend: Resend) {}

  async get(options: GetAttachmentOptions): Promise<GetAttachmentResponse> {
    const { emailId, id } = options;

    const data = await this.resend.get<GetAttachmentResponseSuccess>(
      `/emails/inbound/${emailId}/attachments/${id}`,
    );

    return data;
  }

  async list(
    options: ListAttachmentsOptions,
  ): Promise<ListAttachmentsResponse> {
    const { emailId } = options;

    const data = await this.resend.get<ListAttachmentsResponseSuccess>(
      `/emails/inbound/${emailId}/attachments`,
    );

    return data;
  }
}
