import type { Response } from '../../../interfaces';

export interface VerifyTrackingResponseSuccess {
  object: 'tracking';
  id: string;
}

export type VerifyTrackingResponse =
  Response<VerifyTrackingResponseSuccess>;
