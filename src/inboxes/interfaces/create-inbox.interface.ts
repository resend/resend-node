import type { PostOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';

export interface CreateInboxOptions {
  emailAddress: string;
  name?: string;
  forwarding?: boolean;
  friendlyName?: string;
}

export interface CreateInboxRequestOptions extends PostOptions {}

export interface CreateInboxResponseSuccess {
  object: 'inbox';
  id: string;
  name: string;
  email_address: string;
  domain_id: string;
  forwarding_address: string | null;
  friendly_name: string | null;
  unread: number;
  created_at: string;
}

export type CreateInboxResponse = Response<CreateInboxResponseSuccess>;
