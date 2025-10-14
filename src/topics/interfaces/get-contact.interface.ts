import type { ErrorResponse } from '../../interfaces';
import type { Topic } from './topic';

export interface GetTopicOptions {
  id: string;
}

export type GetTopicResponseSuccess = Topic;

export interface GetTopicResponse {
  data: GetTopicResponseSuccess | null;
  error: ErrorResponse | null;
}
