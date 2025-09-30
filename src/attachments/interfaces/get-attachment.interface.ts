import type { ErrorResponse } from '../../interfaces';
import type { InboundAttachment } from './attachment';

export interface GetAttachmentOptions {
  inboundId: string;
  id: string;
}

// API response type (snake_case from API)
export interface GetAttachmentApiResponse {
  object: 'attachment';
  data: {
    id: string;
    filename?: string;
    content_type: string;
    content_disposition: 'inline' | 'attachment';
    content_id?: string;
    content: string;
  };
}

// SDK response type (camelCase for users)
export interface GetAttachmentResponseSuccess {
  object: 'attachment';
  data: InboundAttachment;
}

export type GetAttachmentResponse =
  | {
      data: GetAttachmentResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
