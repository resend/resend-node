import type { PaginationOptions } from '../../../common/interfaces';
import type { ErrorResponse } from '../../../interfaces';
import type { InboundAttachment } from './attachment';

export type ListAttachmentsOptions = PaginationOptions & {
  emailId: string;
};

// API response type (with download_url)
export interface ListAttachmentsApiResponse {
  object: 'list';
  has_more: boolean;
  data: Array<{
    id: string;
    filename?: string;
    content_type: string;
    content_disposition: 'inline' | 'attachment';
    content_id?: string;
    download_url: string;
  }>;
}

// SDK response type (with base64 content)
export interface ListAttachmentsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: InboundAttachment[];
}

export type ListAttachmentsResponse =
  | {
      data: ListAttachmentsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
