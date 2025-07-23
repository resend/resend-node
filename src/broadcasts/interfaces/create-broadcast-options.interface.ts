import type * as React from 'react';
import type { PostOptions } from '../../common/interfaces';
import type { RequireAtLeastOne } from '../../common/interfaces/require-at-least-one';
import type { ErrorResponse } from '../../interfaces';

interface EmailRenderOptions {
  /**
   * The React component used to write the message.
   *
   * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
   */
  react: React.ReactNode;
  /**
   * The HTML version of the message.
   *
   * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
   */
  html: string;
  /**
   * The plain text version of the message.
   *
   * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
   */
  text: string;
}

interface CreateBroadcastBaseOptions {
  /**
   * The name of the broadcast
   *
   * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
   */
  name?: string;
  /**
   * The id of the audience you want to send to
   *
   * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
   */
  audienceId: string;
  /**
   * A short snippet of text displayed as a preview in recipients' inboxes, often shown below or beside the subject line.
   *
   * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
   */
  previewText?: string;
  /**
   * Sender email address. To include a friendly name, use the format `"Your Name <sender@domain.com>"`
   *
   * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
   */
  from: string;
  /**
   * Reply-to email address. For multiple addresses, send as an array of strings.
   *
   * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
   */
  replyTo?: string | string[];
  /**
   * Email subject.
   *
   * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
   */
  subject: string;
  /**
   * The id of the topic you want to send to
   *
   * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
   */
  topicId?: string | null;
}

export type CreateBroadcastOptions = RequireAtLeastOne<EmailRenderOptions> &
  CreateBroadcastBaseOptions;

export interface CreateBroadcastRequestOptions extends PostOptions {}

export interface CreateBroadcastResponseSuccess {
  /** The ID of the newly sent broadcasts. */
  id: string;
}

export interface CreateBroadcastResponse {
  data: CreateBroadcastResponseSuccess | null;
  error: ErrorResponse | null;
}
