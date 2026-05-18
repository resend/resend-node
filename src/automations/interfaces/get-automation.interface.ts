import type { Response } from '../../interfaces';
import type { Automation } from './automation';
import type {
  AutomationResponseConnection,
  AutomationResponseStep,
} from './automation-step.interface';

export interface GetAutomationResponseSuccess extends Automation {
  object: 'automation';
  steps: AutomationResponseStep[];
  connections: AutomationResponseConnection[];
}

export type GetAutomationResponse = Response<GetAutomationResponseSuccess>;
