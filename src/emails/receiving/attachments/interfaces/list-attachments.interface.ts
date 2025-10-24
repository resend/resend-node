import type { PaginationOptions } from '../../../../common/interfaces';
import type { ErrorResponse } from '../../../../interfaces';
import type { Attachment } from './attachment';

export type ListAttachmentsOptions = PaginationOptions & {
  emailId: string;
};

export interface ListAttachmentsApiResponse {
  object: 'list';
  has_more: boolean;
  data: Attachment[];
}

export interface ListAttachmentsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: Attachment[];
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
