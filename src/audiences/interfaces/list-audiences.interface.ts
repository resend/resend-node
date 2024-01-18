import { ErrorResponse } from '../../interfaces';
import { Audience } from './audience';

export type ListAudiencesResponseSuccess = {
  object: 'list';
  data: Audience[];
};

export interface ListAudiencesResponse {
  data: ListAudiencesResponseSuccess | null;
  error: ErrorResponse | null;
}
