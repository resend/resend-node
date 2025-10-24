import type { Response } from '../../interfaces';
import type { Segment } from './segment';

export interface RemoveSegmentResponseSuccess extends Pick<Segment, 'id'> {
  object: 'segment';
  deleted: boolean;
}

export type RemoveSegmentResponse = Response<RemoveSegmentResponseSuccess>;
