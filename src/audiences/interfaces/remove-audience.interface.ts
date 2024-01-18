import { ErrorResponse } from '../../interfaces';
import { Audience } from './audience';

export interface RemoveAudiencesResponseSuccess extends Pick<Audience, 'id'> {
  object: 'audience';
  deleted: boolean;
}

export interface RemoveAudiencesResponse {
  data: RemoveAudiencesResponseSuccess | null;
  error: ErrorResponse | null;
}
