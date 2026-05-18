import type { Response } from '../../interfaces';
import type { Automation, AutomationStatus } from './automation';
import type {
  AutomationConnection,
  AutomationStep,
} from './automation-step.interface';

export interface UpdateAutomationOptions {
  name?: string;
  status?: AutomationStatus;
  steps?: AutomationStep[];
  connections?: AutomationConnection[];
}

export interface UpdateAutomationResponseSuccess
  extends Pick<Automation, 'id'> {
  object: 'automation';
}

export type UpdateAutomationResponse =
  Response<UpdateAutomationResponseSuccess>;
