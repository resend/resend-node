import type { Response } from '../../interfaces';
import type { Topic } from './topic';

export interface UpdateTopicOptions {
  id: string;
  name?: string;
  description?: string;
}

export type UpdateTopicResponseSuccess = Pick<Topic, 'id'>;

export type UpdateTopicResponse = Response<UpdateTopicResponseSuccess>;
