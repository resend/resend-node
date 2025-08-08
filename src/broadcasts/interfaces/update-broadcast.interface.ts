import type { Response } from '../../interfaces';

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
  replyTo?: string[];
  previewText?: string;
}

export type UpdateBroadcastResponse = Response<UpdateBroadcastResponseSuccess>;
