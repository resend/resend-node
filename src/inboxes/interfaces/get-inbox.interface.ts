import type { Response } from '../../interfaces';

export interface GetInboxResponseSuccess {
  object: 'inbox';
  id: string;
  name: string | null;
  email_address: string;
  forwarding_address: string | null;
  friendly_name: string | null;
  unread: number;
  drafts: number;
  last_received: string | null;
}

export type GetInboxResponse = Response<GetInboxResponseSuccess>;
