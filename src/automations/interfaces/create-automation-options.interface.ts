import type { Response } from '../../interfaces';
import type { AutomationStatus } from './automation';
import type {
  AutomationEdge,
  AutomationStep,
} from './automation-step.interface';

export interface CreateAutomationOptions {
  name: string;
  status?: AutomationStatus;
  steps: AutomationStep[];
  edges: AutomationEdge[];
}

export interface CreateAutomationResponseSuccess {
  object: 'automation';
  id: string;
}

export type CreateAutomationResponse =
  Response<CreateAutomationResponseSuccess>;
