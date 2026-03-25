import type { Response } from '../../interfaces';
import type { Automation } from './automation';
import type {
  AutomationResponseEdge,
  AutomationResponseStep,
} from './automation-step.interface';

export interface GetAutomationResponseSuccess extends Automation {
  object: 'automation';
  steps: AutomationResponseStep[];
  edges: AutomationResponseEdge[];
}

export type GetAutomationResponse = Response<GetAutomationResponseSuccess>;
