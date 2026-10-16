import type { PostOptions } from '../../../common/interfaces';
import type { IdempotentRequest } from '../../../common/interfaces/idempotent-request.interface';
import type { Response } from '../../../interfaces';
import type { InboxSelector } from '../../interfaces/inbox';

export type SendInboxDraftOptions = InboxSelector & {
  draftId: string;
  /**
   * Custom headers to add to the email.
   * The `In-Reply-To`, `References` and `Reply-To` headers are set by Resend and cannot be set here.
   * Sending one of them, in any letter case, returns a 422.
   * Header names cannot be empty, and names and values cannot contain line breaks or null characters, or the request returns a 422.
   * `null` means no custom headers.
   */
  headers?: Record<string, string> | null;
};

export interface SendInboxDraftRequestOptions
  extends PostOptions,
    IdempotentRequest {}

export interface SendInboxDraftResponseSuccess {
  id: string;
}

export type SendInboxDraftResponse = Response<SendInboxDraftResponseSuccess>;
