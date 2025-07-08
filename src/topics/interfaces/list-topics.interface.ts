import type { ErrorResponse } from '../../interfaces';
import type { Topic } from './topic';

export interface ListTopicsResponseSuccess {
  data: Topic[];
}

export interface ListTopicsResponse {
  data: ListTopicsResponseSuccess | null;
  error: ErrorResponse | null;
}
