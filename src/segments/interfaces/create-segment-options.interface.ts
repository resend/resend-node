import type { PostOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Segment } from './segment';

export interface CreateSegmentOptions {
  name: string;
}

export interface CreateSegmentRequestOptions extends PostOptions {}

export interface CreateSegmentResponseSuccess
  extends Pick<Segment, 'name' | 'id'> {
  object: 'segment';
}

export type CreateSegmentResponse = Response<CreateSegmentResponseSuccess>;
