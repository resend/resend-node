import type { PostOptions } from '../../../common/interfaces';
import type { IdempotentRequest } from '../../../common/interfaces/idempotent-request.interface';
import type { Response } from '../../../interfaces';

export interface SendInboxDraftOptions {
  inboxId: string;
  draftId: string;
  /**
   * Custom headers to add to the email.
   * The `In-Reply-To`, `References` and `Reply-To` headers are set by Resend and cannot be set here.
   * Sending one of them, in any letter case, returns a 422.
   */
  headers?: Record<string, string>;
}

export interface SendInboxDraftRequestOptions
  extends PostOptions,
    IdempotentRequest {}

export interface SendInboxDraftResponseSuccess {
  id: string;
}

export type SendInboxDraftResponse = Response<SendInboxDraftResponseSuccess>;
