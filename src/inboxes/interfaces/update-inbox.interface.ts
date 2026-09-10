import type { RequireAtLeastOne } from '../../common/interfaces';
import type { Response } from '../../interfaces';

export type UpdateInboxOptions = RequireAtLeastOne<{
  name?: string;
  friendlyName?: string;
}>;

export interface UpdateInboxResponseSuccess {
  object: 'inbox';
  id: string;
}

export type UpdateInboxResponse = Response<UpdateInboxResponseSuccess>;
