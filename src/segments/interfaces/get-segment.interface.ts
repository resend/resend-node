import type { Response } from '../../interfaces';
import type { Segment } from './segment';

export interface GetSegmentResponseSuccess
  extends Pick<Segment, 'id' | 'name' | 'created_at'> {
  object: 'segment';
}

export type GetSegmentResponse = Response<GetSegmentResponseSuccess>;
