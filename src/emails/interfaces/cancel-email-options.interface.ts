import type { ErrorResponse } from '../../interfaces';

export interface CancelEmailResponseSuccess {
  object: 'email';
  id: string;
}

export type CancelEmailResponse =
  | {
      data: CancelEmailResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
