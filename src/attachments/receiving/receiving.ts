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

type DownloadAttachmentResult =
  | {
      type: 'error';
      message: string;
    }
  | {
      type: 'success';
      base64Content: string;
    };

export class Receiving {
  constructor(private readonly resend: Resend) {}

  private async downloadAttachment(
    url: string,
  ): Promise<DownloadAttachmentResult> {
    try {
      const content = await fetch(url);
      if (!content.ok) {
        return {
          type: 'error',
          message: 'Failed to download attachment content',
        };
      }

      const arrayBuffer = await content.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return {
        type: 'success',
        base64Content: buffer.toString('base64'),
      };
    } catch {
      return {
        type: 'error',
        message: 'An error occurred while downloading attachment content',
      };
    }
  }

  async get(options: GetAttachmentOptions): Promise<GetAttachmentResponse> {
    const { emailId, id } = options;

    const apiResponse = await this.resend.get<GetAttachmentApiResponse>(
      `/emails/receiving/${emailId}/attachments/${id}`,
    );

    if ('error' in apiResponse && apiResponse.error) {
      return apiResponse;
    }

    const {
      expires_at: _expires_at,
      download_url,
      ...otherFields
    } = apiResponse.data.data;
    const downloadResult = await this.downloadAttachment(download_url);
    if (downloadResult.type === 'error') {
      return {
        data: null,
        error: {
          name: 'application_error',
          message: downloadResult.message,
        },
      };
    }

    const responseData: GetAttachmentResponseSuccess = {
      object: 'attachment',
      data: {
        ...otherFields,
        content: downloadResult.base64Content,
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
      const {
        expires_at: _expires_at,
        download_url,
        ...otherFields
      } = attachment;
      const downloadResult = await this.downloadAttachment(download_url);
      if (downloadResult.type === 'error') {
        return {
          data: null,
          error: {
            name: 'application_error',
            message: downloadResult.message,
          },
        };
      }

      attachmentsWithContent.push({
        ...otherFields,
        content: downloadResult.base64Content,
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
