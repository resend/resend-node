import { PostOptions } from '../../common/interfaces';
import { ErrorResponse } from '../../interfaces';
import { Audience } from './audience';

export interface CreateAudienceOptions {
  name: string;
}

export interface CreateAudienceRequestOptions extends PostOptions {}

export interface CreateAudienceResponseSuccess
  extends Pick<Audience, 'name' | 'id'> {
  object: 'audience';
}

export interface CreateAudienceResponse {
  data: CreateAudienceResponseSuccess | null;
  error: ErrorResponse | null;
}
