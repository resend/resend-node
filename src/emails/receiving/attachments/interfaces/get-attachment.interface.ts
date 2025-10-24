import type { ErrorResponse } from '../../../../interfaces';
import type { Attachment } from './attachment';

export interface GetAttachmentOptions {
  emailId: string;
  id: string;
}

export type GetAttachmentResponseSuccess = {
  object: 'attachment';
} & Attachment;

export type GetAttachmentResponse =
  | {
      data: GetAttachmentResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
