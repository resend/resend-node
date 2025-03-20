import type { ErrorResponse } from '../../interfaces';

export interface UpdateBroadcastResponseSuccess {
  id: string;
}

export interface UpdateBroadcastOptions {
  name?: string;
  audienceId?: string;
  from?: string;
  html?: string;
  text?: string;
  subject?: string;
  replyTo?: string;
  previewText?: string;
}

export interface UpdateBroadcastResponse {
  data: UpdateBroadcastResponseSuccess | null;
  error: ErrorResponse | null;
}
