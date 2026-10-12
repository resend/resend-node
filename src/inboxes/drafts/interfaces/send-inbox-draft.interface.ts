import type { PostOptions } from '../../../common/interfaces';
import type { IdempotentRequest } from '../../../common/interfaces/idempotent-request.interface';
import type { Response } from '../../../interfaces';

export interface SendInboxDraftOptions {
  inboxId: string;
  draftId: string;
}

export interface SendInboxDraftRequestOptions
  extends PostOptions,
    IdempotentRequest {}

export interface SendInboxDraftResponseSuccess {
  id: string;
}

export type SendInboxDraftResponse = Response<SendInboxDraftResponseSuccess>;
