import type { Response } from '../../interfaces';
import type { Audience } from './audience';

export interface RemoveAudiencesResponseSuccess extends Pick<Audience, 'id'> {
  object: 'audience';
  deleted: boolean;
}

export type RemoveAudiencesResponse = Response<RemoveAudiencesResponseSuccess>;
