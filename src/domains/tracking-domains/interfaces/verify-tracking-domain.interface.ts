import type { Response } from '../../../interfaces';

export interface VerifyTrackingDomainResponseSuccess {
  object: 'tracking_domain';
  id: string;
}

export type VerifyTrackingDomainResponse =
  Response<VerifyTrackingDomainResponseSuccess>;
