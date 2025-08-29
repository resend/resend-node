import type { ErrorResponse } from '../../interfaces';
import type { SelectingField } from './contact';

export type RemoveContactsResponseSuccess = {
  object: 'contact';
  deleted: boolean;
  contact: string;
};

export type RemoveContactOptions = SelectingField & {
  audienceId?: string;
};

export type RemoveContactsResponse =
  | {
      data: RemoveContactsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
