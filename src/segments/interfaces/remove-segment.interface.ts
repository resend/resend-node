import type { ErrorResponse } from '../../interfaces';
import type { Segment } from './segment';

export interface RemoveSegmentResponseSuccess extends Pick<Segment, 'id'> {
  object: 'segment';
  deleted: boolean;
}

export type RemoveSegmentResponse =
  | {
      data: RemoveSegmentResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
