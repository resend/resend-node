import type { Response } from '../../interfaces';

export interface RotateWebhookSigningSecretResponseSuccess {
  object: 'webhook';
  id: string;
  signing_secret: string;
}

export type RotateWebhookSigningSecretResponse =
  Response<RotateWebhookSigningSecretResponseSuccess>;
