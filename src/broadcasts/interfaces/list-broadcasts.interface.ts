import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Broadcast } from './broadcast';

export type ListBroadcastsOptions = PaginationOptions;

export type ListBroadcastsResponseSuccess = {
  object: 'list';
  has_more: boolean;
  data: Pick<
    Broadcast,
    | 'id'
    | 'name'
    | 'audience_id'
    | 'status'
    | 'created_at'
    | 'scheduled_at'
    | 'sent_at'
  >[];
};

export type ListBroadcastsResponse = Response<ListBroadcastsResponseSuccess>;
