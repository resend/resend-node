import type { ErrorResponse } from '../../interfaces';
import type { Segment } from './segment';

export interface GetSegmentResponseSuccess
  extends Pick<Segment, 'id' | 'name' | 'created_at'> {
  object: 'segment';
}

export type GetSegmentResponse =
  | {
      data: GetSegmentResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
