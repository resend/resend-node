import type { ErrorResponse } from '../../interfaces';
import type { Audience } from './audience';

export interface RemoveAudiencesResponseSuccess extends Pick<Audience, 'id'> {
  object: 'audience';
  deleted: boolean;
}

export interface RemoveAudiencesResponse {
  data: RemoveAudiencesResponseSuccess | null;
  error: ErrorResponse | null;
}
