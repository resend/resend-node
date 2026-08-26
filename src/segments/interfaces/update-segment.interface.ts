import type { Response } from '../../interfaces';
import type { Segment } from './segment';

export interface UpdateSegmentOptions {
  name: string;
}

export interface UpdateSegmentResponseSuccess
  extends Pick<Segment, 'id' | 'name'> {
  object: 'segment';
}

export type UpdateSegmentResponse = Response<UpdateSegmentResponseSuccess>;
