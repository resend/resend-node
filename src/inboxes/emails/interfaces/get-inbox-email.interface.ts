import type { Response } from '../../../interfaces';
import type { InboxMessage } from '../../threads/interfaces';

export interface GetInboxEmailOptions {
  inboxId: string;
  emailId: string;
}

export type GetInboxEmailResponseSuccess = InboxMessage;

export type GetInboxEmailResponse = Response<GetInboxEmailResponseSuccess>;
