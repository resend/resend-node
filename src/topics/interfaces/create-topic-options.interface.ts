import type { ErrorResponse } from '../../interfaces';
import type { Topic } from './topic';

export interface CreateTopicOptions {
  name: string;
  description?: string;
  default_subscription: 'opt_in' | 'opt_out';
}

export type CreateTopicResponseSuccess = Pick<Topic, 'id'>;

export interface CreateTopicResponse {
  data: CreateTopicResponseSuccess | null;
  error: ErrorResponse | null;
}
