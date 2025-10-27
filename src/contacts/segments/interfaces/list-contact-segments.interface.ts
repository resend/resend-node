import type {
  PaginatedData,
  PaginationOptions,
} from '../../../common/interfaces/pagination-options.interface';
import type { Response } from '../../../interfaces';
import type { Segment } from '../../../segments/interfaces/segment';
import type { ContactSegmentsBaseOptions } from './contact-segments.interface';

export type ListContactSegmentsOptions = PaginationOptions &
  ContactSegmentsBaseOptions;

export type ListContactSegmentsResponseSuccess = PaginatedData<Segment[]>;

export type ListContactSegmentsResponse =
  Response<ListContactSegmentsResponseSuccess>;
