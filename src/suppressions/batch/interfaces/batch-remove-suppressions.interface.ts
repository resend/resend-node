import type { Response } from '../../../interfaces';

// Provide either `emails` or `ids`, but not both.
export type BatchRemoveSuppressionsOptions =
  | { emails: string[]; ids?: never }
  | { ids: string[]; emails?: never };

export interface BatchRemoveSuppressionsResponseSuccess {
  data: {
    object: 'suppression';
    id: string;
    deleted: boolean;
  }[];
}

export type BatchRemoveSuppressionsResponse =
  Response<BatchRemoveSuppressionsResponseSuccess>;
