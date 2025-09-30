import type { Resend } from '../resend';
import type {
  GetAttachmentApiResponse,
  GetAttachmentOptions,
  GetAttachmentResponse,
  GetAttachmentResponseSuccess,
} from './interfaces/get-attachment.interface';
import type {
  ListAttachmentsApiResponse,
  ListAttachmentsOptions,
  ListAttachmentsResponse,
} from './interfaces/list-attachments.interface';

export class Attachments {
  constructor(private readonly resend: Resend) {}

  async get(options: GetAttachmentOptions): Promise<GetAttachmentResponse> {
    const { inboundId, id } = options;

    const data = await this.resend.get<GetAttachmentApiResponse>(
      `/emails/inbound/${inboundId}/attachments/${id}`,
    );

    if (data.error) {
      return {
        data: null,
        error: data.error,
      };
    }

    const apiResponse = data.data;

    const transformedData: GetAttachmentResponseSuccess = {
      object: apiResponse.object,
      data: {
        id: apiResponse.data.id,
        filename: apiResponse.data.filename,
        contentType: apiResponse.data.content_type,
        contentDisposition: apiResponse.data.content_disposition,
        contentId: apiResponse.data.content_id,
        content: apiResponse.data.content,
      },
    };

    return {
      data: transformedData,
      error: null,
    };
  }

  async list(
    options: ListAttachmentsOptions,
  ): Promise<ListAttachmentsResponse> {
    const { inboundId } = options;

    const data = await this.resend.get<ListAttachmentsApiResponse>(
      `/emails/inbound/${inboundId}/attachments`,
    );

    if (data.error) {
      return {
        data: null,
        error: data.error,
      };
    }

    const apiResponse = data.data;

    // Transform snake_case to camelCase and return array directly
    const transformedData = apiResponse.data.map((attachment) => ({
      id: attachment.id,
      filename: attachment.filename,
      contentType: attachment.content_type,
      contentDisposition: attachment.content_disposition,
      contentId: attachment.content_id,
      content: attachment.content,
    }));

    return {
      data: transformedData,
      error: null,
    };
  }
}
