import type { PaginationOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';
import type { Audience } from './audience';

export type ListAudiencesOptions = PaginationOptions;

export type ListAudiencesResponseSuccess = {
  object: 'list';
  data: Audience[];
  has_more: boolean;
};

export type ListAudiencesResponse =
  | {
      data: ListAudiencesResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
