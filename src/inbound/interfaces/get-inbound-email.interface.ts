import type { ErrorResponse } from '../../interfaces';
import type { InboundEmail } from './inbound-email';

export interface GetInboundEmailResponseSuccess extends InboundEmail {
  object: 'inbound_email';
}

export type GetInboundEmailResponse =
  | {
      data: GetInboundEmailResponseSuccess;
      error: null;
    }
  | {
      data: null;
      error: ErrorResponse;
    };
