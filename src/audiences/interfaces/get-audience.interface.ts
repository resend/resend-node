import type { ErrorResponse } from '../../interfaces';
import type { Audience } from './audience';

export interface GetAudienceResponseSuccess
  extends Pick<Audience, 'id' | 'name' | 'created_at'> {
  object: 'audience';
}

export type GetAudienceResponse =
  | {
      data: GetAudienceResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
