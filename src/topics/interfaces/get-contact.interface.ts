import type { Response } from '../../interfaces';
import type { Topic } from './topic';

export interface GetTopicOptions {
  id: string;
}

export type GetTopicResponseSuccess = Topic;

export type GetTopicResponse = Response<GetTopicResponseSuccess>;
