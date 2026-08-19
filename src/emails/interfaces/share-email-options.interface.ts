import type { Response } from '../../interfaces';

export interface ShareEmailOptions {
  expiresIn?: string;
}

export interface ShareEmailResponseSuccess {
  object: 'email';
  id: string;
  url: string;
}

export type ShareEmailResponse = Response<ShareEmailResponseSuccess>;
