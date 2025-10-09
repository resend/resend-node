import type { Resend } from '../resend';
import { Receiving } from './receiving/receiving';

export class Attachments {
  readonly receiving: Receiving;

  constructor(resend: Resend) {
    this.receiving = new Receiving(resend);
  }
}
