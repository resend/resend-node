import { Webhook } from 'svix';

interface Headers {
  id: string;
  timestamp: string;
  signature: string;
}

interface VerifyWebhookOptions {
  payload: string;
  headers: Headers;
  webhookSecret: string;
}

export class Webhooks {
  verify(payload: VerifyWebhookOptions) {
    const webhook = new Webhook(payload.webhookSecret);
    return webhook.verify(payload.payload, {
      'svix-id': payload.headers.id,
      'svix-timestamp': payload.headers.timestamp,
      'svix-signature': payload.headers.signature,
    });
  }
}
