import type { PostOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Audience } from './audience';

export interface CreateAudienceOptions {
  name: string;
}

export interface CreateAudienceRequestOptions extends PostOptions {}

export interface CreateAudienceResponseSuccess
  extends Pick<Audience, 'name' | 'id'> {
  object: 'audience';
}

export type CreateAudienceResponse = Response<CreateAudienceResponseSuccess>;
