import { ErrorResponse } from '../../interfaces';
import { Audience } from './audience';

export interface GetAudienceResponseSuccess
  extends Pick<Audience, 'id' | 'name' | 'created_at'> {
  object: 'audience';
}

export interface GetAudienceResponse {
  data: GetAudienceResponseSuccess | null;
  error: ErrorResponse | null;
}
