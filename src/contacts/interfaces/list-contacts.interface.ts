import type {
  PaginatedApiResponse,
  PaginatedData,
  PaginationOptions,
} from '../../common/interfaces/pagination';
import type { Response } from '../../interfaces';
import type { Contact } from './contact';

export interface ListAudienceContactsOptions {
  audienceId: string;
}

export type ListContactsOptions = PaginationOptions<string>;

export interface ListAudienceContactsResponseSuccess {
  object: 'list';
  data: Contact[];
}
export type ListAudienceContactsResponse =
  Response<ListAudienceContactsResponseSuccess>;

export type ListContactsApiResponseSuccess = PaginatedApiResponse<Contact[]>;
export type ListContactsResponseSuccess = PaginatedData<Contact[]>;

export type ListContactsResponse = Response<ListContactsResponseSuccess>;
