import type { Response } from '../../interfaces';
import type { SelectingField } from './contact';

export type RemoveContactsResponseSuccess = {
  object: 'contact';
  deleted: boolean;
  id: string;
  /**
   * Same as `id`. Kept for backward compatibility.
   * @deprecated Use `id` instead. Will be removed in the next major version.
   */
  contact: string;
};

export type RemoveContactOptions =
  | string
  | (SelectingField & {
      audienceId?: string;
    });

export type RemoveContactsResponse = Response<RemoveContactsResponseSuccess>;
