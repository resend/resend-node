import type { ErrorResponse } from '../../interfaces';
import type { Topic } from './topic';

export interface UpdateTopicOptions {
  id: string;
  name?: string;
  description?: string;
}

export type UpdateTopicResponseSuccess = Pick<Topic, 'id'>;

export interface UpdateTopicResponse {
  data: UpdateTopicResponseSuccess | null;
  error: ErrorResponse | null;
}
