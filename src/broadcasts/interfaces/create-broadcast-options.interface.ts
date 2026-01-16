import type * as React from 'react';
import type { PostOptions } from '../../common/interfaces';
import type { RequireAtLeastOne } from '../../common/interfaces/require-at-least-one';
import type { Response } from '../../interfaces';

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

interface SegmentOptions {
  /**
   * The id of the segment you want to send to
   *
   * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
   */
  segmentId: string;
  /**
   * @deprecated Use segmentId instead
   */
  audienceId: string;
}

type SendBroadcastOnCreationOptions =
  | {
      /**
       * Whether to send the broadcast immediately or keep it as a draft.
       * If not provided or set to false, the broadcast will be created as a draft.
       *
       * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
       */
      send: true;
      /**
       * Schedule time to send the broadcast. Can only be used if `send` is true.
       * The date should be in ISO 8601 format (e.g: 2024-08-05T11:52:01.858Z)
       * or relative time (eg: in 2 days).
       *
       * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
       */
      scheduledAt?: string;
    }
  | {
      /**
       * Whether to send the broadcast immediately or keep it as a draft.
       * If not provided or set to false, the broadcast will be created as a draft.
       *
       * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
       */
      send?: false;
      /**
       * Schedule time to send the broadcast. Can only be used if `send` is true.
       * The date should be in ISO 8601 format (e.g: 2024-08-05T11:52:01.858Z)
       * or relative time (eg: in 2 days).
       *
       * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
       */
      scheduledAt?: never;
    };

interface CreateBroadcastBaseOptions {
  /**
   * The name of the broadcast
   *
   * @link https://resend.com/docs/api-reference/broadcasts/create#body-parameters
   */
  name?: string;
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
  RequireAtLeastOne<SegmentOptions> &
  CreateBroadcastBaseOptions &
  SendBroadcastOnCreationOptions;

export interface CreateBroadcastRequestOptions extends PostOptions {}

export interface CreateBroadcastResponseSuccess {
  /** The ID of the newly sent broadcasts. */
  id: string;
}

export type CreateBroadcastResponse = Response<CreateBroadcastResponseSuccess>;
