import type { ErrorResponse } from '../../interfaces';

export interface UpdateEmailOptions {
  id: string;
  scheduledAt: string;
}

export interface UpdateEmailResponseSuccess {
  id: string;
  object: 'email';
}

export interface UpdateEmailResponse {
  data: UpdateEmailResponseSuccess | null;
  error: ErrorResponse | null;
}
