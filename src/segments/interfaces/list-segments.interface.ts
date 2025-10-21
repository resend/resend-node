import type { PaginationOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';
import type { Segment } from './segment';

export type ListSegmentsOptions = PaginationOptions;

export type ListSegmentsResponseSuccess = {
  object: 'list';
  data: Segment[];
  has_more: boolean;
};

export type ListSegmentsResponse =
  | {
      data: ListSegmentsResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
