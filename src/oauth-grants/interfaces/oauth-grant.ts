export interface OAuthGrant {
  id: string;
  client_id: string;
  scopes: string[];
  created_at: string;
  revoked_at: string | null;
  revoked_reason: string | null;
  client: {
    name: string;
    logo_uri: string | null;
  };
}
