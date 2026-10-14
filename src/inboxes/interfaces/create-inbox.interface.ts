import type { PostOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';

export interface CreateInboxOptions {
  emailAddress: string;
  name?: string;
  forwarding?: boolean;
  fromName?: string;
}

export interface CreateInboxRequestOptions extends PostOptions {}

export interface CreateInboxResponseSuccess {
  object: 'inbox';
  id: string;
}

export type CreateInboxResponse = Response<CreateInboxResponseSuccess>;
