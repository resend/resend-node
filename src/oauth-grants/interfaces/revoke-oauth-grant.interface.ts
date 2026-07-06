import type { Response } from '../../interfaces';

export type RevokeOAuthGrantResponseSuccess = {
  object: 'oauth_grant';
  id: string;
  revoked_at: string;
  revoked_reason: string;
};

export type RevokeOAuthGrantResponse =
  Response<RevokeOAuthGrantResponseSuccess>;
