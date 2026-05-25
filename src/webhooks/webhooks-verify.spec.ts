import { Webhook } from 'standardwebhooks';
import { describe, expect, it } from 'vitest';
import { Resend } from '../resend';

// Uses the REAL `standardwebhooks` implementation (no module mock) to prove the
// end-to-end signature verification path works after migrating off `svix`.
describe('Webhooks.verify (real signature round-trip)', () => {
  const webhookSecret = 'whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw';
  const resend = new Resend('re_zKa4RCko_Lhm9ost2YjNCctnPjbLw8Nop');

  it('verifies a genuinely signed payload and returns the parsed event', () => {
    const id = 'msg_2KWPBgLlAfxdpx2AI54pPJ85f4W';
    const payload = JSON.stringify({ type: 'email.sent', data: { id } });
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = new Webhook(webhookSecret).sign(
      id,
      new Date(timestamp * 1000),
      payload,
    );

    const result = resend.webhooks.verify({
      payload,
      headers: { id, timestamp: String(timestamp), signature },
      webhookSecret,
    });

    expect(result).toEqual({ type: 'email.sent', data: { id } });
  });

  it('throws when the signature does not match', () => {
    const id = 'msg_2KWPBgLlAfxdpx2AI54pPJ85f4W';
    const payload = JSON.stringify({ type: 'email.sent' });
    const timestamp = Math.floor(Date.now() / 1000);

    expect(() =>
      resend.webhooks.verify({
        payload,
        headers: {
          id,
          timestamp: String(timestamp),
          signature: 'v1,not-a-valid-signature',
        },
        webhookSecret,
      }),
    ).toThrow();
  });
});
