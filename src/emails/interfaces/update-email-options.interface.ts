import type { Response } from '../../interfaces';

export interface UpdateEmailOptions {
  id: string;
  scheduledAt: string;
}

export interface UpdateEmailResponseSuccess {
  id: string;
  object: 'email';
}

export type UpdateEmailResponse = Response<UpdateEmailResponseSuccess>;
