import type { ErrorResponse } from '../../interfaces';
import type { Audience } from './audience';

export interface RemoveAudiencesResponseSuccess extends Pick<Audience, 'id'> {
  object: 'audience';
  deleted: boolean;
}

export type RemoveAudiencesResponse =
  | {
      data: RemoveAudiencesResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
