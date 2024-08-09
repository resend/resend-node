import type { ErrorResponse } from '../../interfaces';

export interface CancelEmailResponse {
  data: CancelEmailResponseSuccess | null;
  error: ErrorResponse | null;
}

export interface CancelEmailResponseSuccess {
  object: 'email';
  id: string;
}
