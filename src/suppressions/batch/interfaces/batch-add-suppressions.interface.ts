import type { Response } from '../../../interfaces';

export interface BatchAddSuppressionsOptions {
  emails: string[];
}

export interface BatchAddSuppressionsResponseSuccess {
  data: {
    object: 'suppression';
    id: string;
  }[];
}

export type BatchAddSuppressionsResponse =
  Response<BatchAddSuppressionsResponseSuccess>;
