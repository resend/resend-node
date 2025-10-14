import { buildPaginationQuery } from '../../common/utils/build-pagination-query';
import type { Resend } from '../../resend';
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

export class Receiving {
  constructor(private readonly resend: Resend) {}

  async get(options: GetAttachmentOptions): Promise<GetAttachmentResponse> {
    const { emailId, id } = options;

    const apiResponse = await this.resend.get<GetAttachmentApiResponse>(
      `/emails/receiving/${emailId}/attachments/${id}`,
    );

    if ('error' in apiResponse && apiResponse.error) {
      return apiResponse;
    }

    const downloadResponse = await fetch(apiResponse.data.data.download_url);
    if (!downloadResponse.ok) {
      return {
        data: null,
        error: {
          name: 'application_error',
          message: 'Failed to download attachment content',
        },
      };
    }

    const arrayBuffer = await downloadResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Content = buffer.toString('base64');

    const { download_url, ...otherFields } = apiResponse.data.data;
    const responseData: GetAttachmentResponseSuccess = {
      object: 'attachment',
      data: {
        ...otherFields,
        content: base64Content,
      },
    };

    return {
      data: responseData,
      error: null,
    };
  }

  async list(
    options: ListAttachmentsOptions,
  ): Promise<ListAttachmentsResponse> {
    const { emailId } = options;

    const queryString = buildPaginationQuery(options);
    const url = queryString
      ? `/emails/receiving/${emailId}/attachments?${queryString}`
      : `/emails/receiving/${emailId}/attachments`;

    const apiResponse = await this.resend.get<ListAttachmentsApiResponse>(url);

    if ('error' in apiResponse && apiResponse.error) {
      return apiResponse;
    }

    const attachmentsWithContent = [];
    for (const attachment of apiResponse.data.data) {
      const downloadResponse = await fetch(attachment.download_url);
      if (!downloadResponse.ok) {
        return {
          data: null,
          error: {
            name: 'application_error',
            message: `Failed to download attachment ${attachment.id}`,
          },
        };
      }

      const arrayBuffer = await downloadResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Content = buffer.toString('base64');

      const { download_url, ...otherFields } = attachment;
      attachmentsWithContent.push({
        ...otherFields,
        content: base64Content,
      });
    }

    return {
      data: {
        object: 'list',
        has_more: apiResponse.data.has_more,
        data: attachmentsWithContent,
      },
      error: null,
    };
  }
}
