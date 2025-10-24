import type { Response } from '../../interfaces';
import type { Topic } from './topic';

export interface ListTopicsResponseSuccess {
  data: Topic[];
}

export type ListTopicsResponse = Response<ListTopicsResponseSuccess>;
