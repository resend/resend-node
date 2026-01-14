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

export interface ForwardReceivingEmailResponseSuccess {
  id: string;
}

export type ForwardReceivingEmailResponse =
  Response<ForwardReceivingEmailResponseSuccess>;
