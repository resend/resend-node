import type { ErrorResponse } from '../../../interfaces';
import type { ContactSegmentsBaseOptions } from './contact-segments.interface';

export type AddContactSegmentOptions = ContactSegmentsBaseOptions & {
  segmentId: string;
};

export interface AddContactSegmentResponseSuccess {
  id: string;
}

export type AddContactSegmentResponse =
  | {
      data: AddContactSegmentResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
