import type { Response } from '../../interfaces';

export interface CancelEmailResponseSuccess {
  object: 'email';
  id: string;
}

export type CancelEmailResponse = Response<CancelEmailResponseSuccess>;
