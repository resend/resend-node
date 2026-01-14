import type { Response } from '../../../interfaces';

export interface ForwardReceivingEmailOptions {
  emailId: string;
  to: string | string[];
  from: string;
  text?: string;
  html?: string;
}

export interface ForwardReceivingEmailResponseSuccess {
  id: string;
}

export type ForwardReceivingEmailResponse =
  Response<ForwardReceivingEmailResponseSuccess>;
