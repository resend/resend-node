import type { ErrorResponse } from '../../interfaces';
import type { Broadcast } from './broadcast';

export type ListBroadcastsResponseSuccess = {
  object: 'list';
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

export interface ListBroadcastsResponse {
  data: ListBroadcastsResponseSuccess | null;
  error: ErrorResponse | null;
}
