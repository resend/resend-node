import type { Response } from '../../interfaces';
import type { Audience } from './audience';

export type ListAudiencesResponseSuccess = {
  object: 'list';
  data: Audience[];
};

export type ListAudiencesResponse = Response<ListAudiencesResponseSuccess>;
