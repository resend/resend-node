import type { Attachment } from '../../../common/interfaces/attachment.interface';
import type { ErrorResponse } from '../../../interfaces';

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
