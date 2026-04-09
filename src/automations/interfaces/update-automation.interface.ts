import type { Response } from '../../interfaces';
import type { Automation, AutomationStatus } from './automation';
import type { AutomationEdge, AutomationStep } from './automation-step.interface';

export interface UpdateAutomationOptions {
  name?: string;
  status?: AutomationStatus;
  steps?: AutomationStep[];
  edges?: AutomationEdge[];
}

export interface UpdateAutomationResponseSuccess
  extends Pick<Automation, 'id'> {
  object: 'automation';
}

export type UpdateAutomationResponse =
  Response<UpdateAutomationResponseSuccess>;
