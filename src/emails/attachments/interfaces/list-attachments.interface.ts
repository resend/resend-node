import type { PaginationOptions } from '../../../common/interfaces';
import type { AttachmentData } from '../../../common/interfaces/attachment.interface';
import type { Response } from '../../../interfaces';

export type ListAttachmentsOptions = PaginationOptions & {
  emailId: string;
};

export interface ListAttachmentsResponseSuccess {
  object: 'list';
  has_more: boolean;
  data: AttachmentData[];
}

export type ListAttachmentsResponse = Response<ListAttachmentsResponseSuccess>;
