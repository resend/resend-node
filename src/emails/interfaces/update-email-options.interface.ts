import type { ErrorResponse } from '../../interfaces';

export interface UpdateEmailOptions {
  id: string;
  scheduledAt: string;
}

export interface UpdateEmailResponseSuccess {
  id: string;
  object: 'email';
}

export type UpdateEmailResponse =
  | {
      data: UpdateEmailResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
