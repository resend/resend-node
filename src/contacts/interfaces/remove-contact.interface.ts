import type { Response } from '../../interfaces';
import type { SelectingField } from './contact';

export type RemoveContactsResponseSuccess = {
  object: 'contact';
  deleted: boolean;
  contact: string;
};

export type RemoveContactOptions =
  | string
  | (SelectingField & {
      audienceId?: string;
    });

export type RemoveContactsResponse = Response<RemoveContactsResponseSuccess>;
