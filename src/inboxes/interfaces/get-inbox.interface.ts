import type { Response } from '../../interfaces';

export interface GetInboxResponseSuccess {
  object: 'inbox';
  id: string;
  name: string;
  email_address: string;
  domain_id: string;
  receiving_address: string | null;
  from_name: string | null;
  unread: number;
  drafts: number;
  last_received: string | null;
  created_at: string;
}

export type GetInboxResponse = Response<GetInboxResponseSuccess>;
