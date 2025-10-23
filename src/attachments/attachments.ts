import type { Resend } from '../resend';
import { Receiving } from './receiving/receiving';
import { Sending } from './sending/sending';

export class Attachments {
  readonly receiving: Receiving;
  readonly sending: Sending;

  constructor(resend: Resend) {
    this.receiving = new Receiving(resend);
    this.sending = new Sending(resend);
  }
}
