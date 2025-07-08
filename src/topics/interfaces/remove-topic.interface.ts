import type { ErrorResponse } from '../../interfaces';
import type { Topic } from './topic';

export type RemoveTopicResponseSuccess = Pick<Topic, 'id'> & {
  object: 'topic';
  deleted: boolean;
};

export interface RemoveTopicResponse {
  data: RemoveTopicResponseSuccess | null;
  error: ErrorResponse | null;
}
