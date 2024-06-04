import type { ErrorResponse } from '../../interfaces';
import type { Audience } from './audience';

export type ListAudiencesResponseSuccess = {
  object: 'list';
  data: Audience[];
};

export interface ListAudiencesResponse {
  data: ListAudiencesResponseSuccess | null;
  error: ErrorResponse | null;
}
