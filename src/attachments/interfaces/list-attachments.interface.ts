import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
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

export type ListAttachmentsResponse = Response<ListAttachmentsResponseSuccess>;
