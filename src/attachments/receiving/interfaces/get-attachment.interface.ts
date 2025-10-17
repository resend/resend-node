import type { ErrorResponse } from '../../../interfaces';
import type { InboundAttachment } from './attachment';

export interface GetAttachmentOptions {
  emailId: string;
  id: string;
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
