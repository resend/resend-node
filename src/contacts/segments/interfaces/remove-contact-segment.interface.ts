import type { Response } from '../../../interfaces';
import type { ContactSegmentsBaseOptions } from './contact-segments.interface';

export type RemoveContactSegmentOptions = ContactSegmentsBaseOptions & {
  segmentId: string;
};

export interface RemoveContactSegmentResponseSuccess {
  id: string;
  deleted: boolean;
}

export type RemoveContactSegmentResponse =
  Response<RemoveContactSegmentResponseSuccess>;
