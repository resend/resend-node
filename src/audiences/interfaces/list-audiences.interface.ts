import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { Audience } from './audience';

export type ListAudiencesOptions = PaginationOptions;

export type ListAudiencesResponseSuccess = {
  object: 'list';
  data: Audience[];
  has_more: boolean;
};

export type ListAudiencesResponse = Response<ListAudiencesResponseSuccess>;
