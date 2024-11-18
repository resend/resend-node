import type { PostOptions } from '../../common/interfaces';
import type { ErrorResponse } from '../../interfaces';

interface SendBroadcastBaseOptions {
  /**
   * Schedule email to be sent later.
   * The date should be in ISO 8601 format (e.g: 2024-08-05T11:52:01.858Z).
   *
   * @link https://resend.com/docs/api-reference/broadcasts/sendl#body-parameters
   */
  scheduledAt?: string;
}

export type SendBroadcastOptions = SendBroadcastBaseOptions;

export interface SendBroadcastRequestOptions extends PostOptions {}

export interface SendBroadcastResponseSuccess {
  /** The ID of the newly sent broadcasts. */
  id: string;
}

export interface SendBroadcastResponse {
  data: SendBroadcastResponseSuccess | null;
  error: ErrorResponse | null;
}
