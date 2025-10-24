import type { Response } from '../../interfaces';
import type { Topic } from './topic';

export type RemoveTopicResponseSuccess = Pick<Topic, 'id'> & {
  object: 'topic';
  deleted: boolean;
};

export type RemoveTopicResponse = Response<RemoveTopicResponseSuccess>;
