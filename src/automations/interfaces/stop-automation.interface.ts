import type { Response } from '../../interfaces';

export interface StopAutomationResponseSuccess {
  object: 'automation';
  id: string;
  status: 'disabled';
}

export type StopAutomationResponse = Response<StopAutomationResponseSuccess>;
