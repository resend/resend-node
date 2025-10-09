import type { ErrorResponse } from '../../../interfaces';
import type { InboundAttachment } from './attachment';

export interface ListAttachmentsOptions {
  emailId: string;
}

export interface ListAttachmentsResponseSuccess {
  object: 'attachment';
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
