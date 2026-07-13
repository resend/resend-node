import type { PaginationOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { OAuthGrant } from './oauth-grant';

export type ListOAuthGrantsOptions = PaginationOptions;

export type ListOAuthGrantsResponseSuccess = {
  object: 'list';
  has_more: boolean;
  data: OAuthGrant[];
};

export type ListOAuthGrantsResponse = Response<ListOAuthGrantsResponseSuccess>;
