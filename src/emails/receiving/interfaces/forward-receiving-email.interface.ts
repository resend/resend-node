import type { PostOptions } from '../../../common/interfaces';
import type { IdempotentRequest } from '../../../common/interfaces/idempotent-request.interface';
import type { RequireAtLeastOne } from '../../../common/interfaces/require-at-least-one';
import type { Response } from '../../../interfaces';

interface ForwardReceivingEmailBodyOptions {
  text: string;
  html: string;
}

interface ForwardReceivingEmailBaseOptions {
  emailId: string;
  to: string | string[];
  from: string;
}

export type ForwardReceivingEmailOptions =
  | (ForwardReceivingEmailBaseOptions & { passthrough?: true })
  | (ForwardReceivingEmailBaseOptions & {
      passthrough: false;
    } & RequireAtLeastOne<ForwardReceivingEmailBodyOptions>);

export interface ForwardReceivingEmailRequestOptions
  extends PostOptions,
    IdempotentRequest {}

export interface ForwardReceivingEmailResponseSuccess {
  id: string;
}

export type ForwardReceivingEmailResponse =
  Response<ForwardReceivingEmailResponseSuccess>;
