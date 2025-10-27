import type { Attachment } from '../../../common/interfaces/attachment.interface';
import type { Response } from '../../../interfaces';

export interface GetAttachmentOptions {
  emailId: string;
  id: string;
}

export type GetAttachmentResponseSuccess = {
  object: 'attachment';
} & Attachment;

export type GetAttachmentResponse = Response<GetAttachmentResponseSuccess>;
