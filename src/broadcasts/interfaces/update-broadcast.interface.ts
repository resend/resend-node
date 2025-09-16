import type { ErrorResponse } from '../../interfaces';

export interface UpdateBroadcastResponseSuccess {
  id: string;
}

export type UpdateBroadcastOptions = {
  name?: string;
  audienceId?: string;
  from?: string;
  html?: string;
  react?: React.ReactNode;
  text?: string;
  subject?: string;
  replyTo?: string[];
  previewText?: string;
};

export type UpdateBroadcastResponse =
  | {
      data: UpdateBroadcastResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
