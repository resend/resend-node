import type { Response } from '../../interfaces';
import type { Attachment } from './attachment';

export interface GetAttachmentOptions {
  emailId: string;
  id: string;
}

export type GetAttachmentResponseSuccess = {
  object: 'attachment';
} & Attachment;

export type GetAttachmentResponse = Response<GetAttachmentResponseSuccess>;
