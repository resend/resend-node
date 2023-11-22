import { ErrorResponse } from '../../interfaces';
import { Audience } from './audience';

export type ListAudiencesResponseSuccess = Audience[];

export interface ListAudiencesResponse {
  data: ListAudiencesResponseSuccess | null;
  error: ErrorResponse | null;
}
