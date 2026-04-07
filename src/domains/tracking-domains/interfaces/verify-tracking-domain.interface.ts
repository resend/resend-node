import type { Response } from '../../../interfaces';

export interface VerifyTrackingDomainResponseSuccess {
  object: 'tracking';
  id: string;
}

export type VerifyTrackingDomainResponse =
  Response<VerifyTrackingDomainResponseSuccess>;
