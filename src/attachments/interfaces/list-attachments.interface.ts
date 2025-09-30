import type { ErrorResponse } from '../../interfaces';
import type { InboundAttachment } from './attachment';

export interface ListAttachmentsOptions {
  inboundId: string;
}

// API response type (snake_case from API)
export interface ListAttachmentsApiResponse {
  object: 'attachment';
  data: Array<{
    id: string;
    filename?: string;
    content_type: string;
    content_disposition: 'inline' | 'attachment';
    content_id?: string;
    content: string;
  }>;
}

export type ListAttachmentsResponse =
  | {
      data: InboundAttachment[];
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
