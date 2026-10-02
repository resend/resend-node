import type { PostOptions } from '../../common/interfaces';
import type { Response } from '../../interfaces';
import type { GetInboxResponseSuccess } from './get-inbox.interface';

export interface CreateInboxOptions {
  emailAddress: string;
  name?: string;
  forwarding?: boolean;
  fromName?: string;
}

export interface CreateInboxRequestOptions extends PostOptions {}

export type CreateInboxResponseSuccess = GetInboxResponseSuccess;

export type CreateInboxResponse = Response<CreateInboxResponseSuccess>;
