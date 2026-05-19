import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Log } from './log';

export type ListLogsOptions = PaginationOptions;

export type ListLogsResponseSuccess = {
  object: 'list';
  has_more: boolean;
  data: Pick<
    Log,
    | 'id'
    | 'created_at'
    | 'endpoint'
    | 'method'
    | 'response_status'
    | 'user_agent'
  >[];
};

export type ListLogsResponse = Response<ListLogsResponseSuccess>;
