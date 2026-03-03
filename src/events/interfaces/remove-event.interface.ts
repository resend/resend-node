import type { Response } from '../../interfaces';

export interface RemoveEventResponseSuccess {
  object: 'event';
  id: string;
  deleted: true;
}

export type RemoveEventResponse = Response<RemoveEventResponseSuccess>;
