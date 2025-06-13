import type { ErrorResponse } from '../../interfaces';
import type { Audience } from './audience';

export type ListAudiencesResponseSuccess = {
  object: 'list';
  data: Audience[];
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
