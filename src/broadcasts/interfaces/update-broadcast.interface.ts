import type { Response } from '../../interfaces';

export interface UpdateBroadcastResponseSuccess {
  id: string;
}

export type UpdateBroadcastOptions = {
  name?: string;
  segmentId?: string;
  /**
   * @deprecated Use segmentId instead
   */
  audienceId?: string;
  from?: string;
  html?: string;
  react?: React.ReactNode;
  text?: string;
  subject?: string;
  replyTo?: string[];
  previewText?: string;
  topicId?: string | null;
};

export type UpdateBroadcastResponse = Response<UpdateBroadcastResponseSuccess>;
