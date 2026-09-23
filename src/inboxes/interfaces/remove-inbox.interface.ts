import type { Response } from '../../interfaces';

export interface RemoveInboxResponseSuccess {
  object: 'inbox';
  id: string;
  deleted: boolean;
}

export type RemoveInboxResponse = Response<RemoveInboxResponseSuccess>;
