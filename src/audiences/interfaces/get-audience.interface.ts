import type { Response } from '../../interfaces';
import type { Audience } from './audience';

export interface GetAudienceResponseSuccess
  extends Pick<Audience, 'id' | 'name' | 'created_at'> {
  object: 'audience';
}

export type GetAudienceResponse = Response<GetAudienceResponseSuccess>;
