import type { Response } from '../../interfaces';
import type { Topic } from './topic';

export interface CreateTopicOptions {
  name: string;
  description?: string;
  defaultSubscription: 'opt_in' | 'opt_out';
}

export type CreateTopicResponseSuccess = Pick<Topic, 'id'>;

export type CreateTopicResponse = Response<CreateTopicResponseSuccess>;
