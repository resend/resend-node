import type { Audience } from '../../../audiences/interfaces/audience';
import type {
  PaginatedApiResponse,
  PaginatedData,
  PaginationOptions,
} from '../../../common/interfaces/pagination';
import type { Response } from '../../../interfaces';
import type { ContactAudiencesBaseOptions } from './contact-audiences.interface';

export type ListContactAudiencesOptions = PaginationOptions<string> &
  ContactAudiencesBaseOptions;

export type ListContactAudiencesApiResponseSuccess = PaginatedApiResponse<
  Audience[]
>;

export type ListContactAudiencesResponseSuccess = PaginatedData<Audience[]>;
export type ListContactAudiencesResponse =
  Response<ListContactAudiencesResponseSuccess>;
