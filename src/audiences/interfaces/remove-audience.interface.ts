import { ErrorResponse } from '../../interfaces';
import { Audience } from './audience';

export type RemoveAudiencesResponseSuccess = Pick<Audience, 'id'>;

export interface RemoveAudiencesResponse {
  data: RemoveAudiencesResponseSuccess | null;
  error: ErrorResponse | null;
}
