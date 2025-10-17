import type { PostOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';
import type { Segment } from './segment';

export interface CreateSegmentOptions {
  name: string;
}

export interface CreateSegmentRequestOptions extends PostOptions {}

export interface CreateSegmentResponseSuccess
  extends Pick<Segment, 'name' | 'id'> {
  object: 'audience';
}

export type CreateSegmentResponse =
  | {
      data: CreateSegmentResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
