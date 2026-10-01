import { buildPaginationUrl } from '../common/utils/build-pagination-query';
import type { Resend } from '../resend';
import type {
  ListOAuthGrantsOptions,
  ListOAuthGrantsResponse,
  ListOAuthGrantsResponseSuccess,
} from './interfaces/list-oauth-grants.interface';
import type {
  RevokeOAuthGrantResponse,
  RevokeOAuthGrantResponseSuccess,
} from './interfaces/revoke-oauth-grant.interface';

export class OAuthGrants {
  constructor(private readonly resend: Resend) {}

  async list(
    options: ListOAuthGrantsOptions = {},
  ): Promise<ListOAuthGrantsResponse> {
    const url = buildPaginationUrl('/oauth/grants', options);

    const data = await this.resend.get<ListOAuthGrantsResponseSuccess>(
      url,
      options,
    );
    return data;
  }

  async revoke(id: string): Promise<RevokeOAuthGrantResponse> {
    const data = await this.resend.delete<RevokeOAuthGrantResponseSuccess>(
      `/oauth/grants/${id}`,
    );
    return data;
  }
}
