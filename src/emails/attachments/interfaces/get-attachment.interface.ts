import type { AttachmentData } from '../../../common/interfaces/attachment.interface';
import type { Response } from '../../../interfaces';

export interface GetAttachmentOptions {
  emailId: string;
  id: string;
}

export type GetAttachmentResponseSuccess = {
  object: 'attachment';
} & AttachmentData;

export type GetAttachmentResponse = Response<GetAttachmentResponseSuccess>;
