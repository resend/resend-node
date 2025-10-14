import type { PaginationOptions } from '../../../common/interfaces';
import type { ErrorResponse } from '../../../interfaces';
import type { InboundAttachment } from './attachment';

export type ListAttachmentsOptions = PaginationOptions & {
  emailId: string;
};

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
