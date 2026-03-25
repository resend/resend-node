import type { Response } from '../../interfaces';
import type { Automation, AutomationStatus } from './automation';

export interface UpdateAutomationOptions {
  status: AutomationStatus;
}

export interface UpdateAutomationResponseSuccess
  extends Pick<Automation, 'id' | 'status'> {
  object: 'automation';
}

export type UpdateAutomationResponse =
  Response<UpdateAutomationResponseSuccess>;
