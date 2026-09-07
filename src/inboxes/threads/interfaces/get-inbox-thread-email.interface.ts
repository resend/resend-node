import type { Response } from '../../../interfaces';
import type { InboxMessage } from './thread';

export type GetInboxThreadEmailResponseSuccess = InboxMessage;

export type GetInboxThreadEmailResponse =
  Response<GetInboxThreadEmailResponseSuccess>;
