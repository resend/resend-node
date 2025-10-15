import type { ErrorResponse } from '../../../interfaces';
import type { ApiInboundAttachment, InboundAttachment } from './attachment';

export interface GetAttachmentOptions {
  emailId: string;
  id: string;
}

export interface GetAttachmentApiResponse {
  object: 'attachment';
  data: ApiInboundAttachment;
}

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
