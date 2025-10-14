import type { Audience } from '../../../audiences/interfaces/audience';
import type {
  PaginatedData,
  PaginationOptions,
} from '../../../common/interfaces/pagination-options.interface';
import type { ErrorResponse } from '../../../interfaces';
import type { ContactAudiencesBaseOptions } from './contact-audiences.interface';

export type ListContactAudiencesOptions = PaginationOptions &
  ContactAudiencesBaseOptions;

export type ListContactAudiencesResponseSuccess = PaginatedData<Audience[]>;

export type ListContactAudiencesResponse =
  | {
      data: ListContactAudiencesResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
