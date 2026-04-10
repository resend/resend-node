import type { Response } from '../../interfaces';
import type { AutomationStatus } from './automation';
import type {
  AutomationConnection,
  AutomationStep,
} from './automation-step.interface';

export interface CreateAutomationOptions {
  name: string;
  status?: AutomationStatus;
  steps: AutomationStep[];
  connections: AutomationConnection[];
}

export interface CreateAutomationResponseSuccess {
  object: 'automation';
  id: string;
}

export type CreateAutomationResponse =
  Response<CreateAutomationResponseSuccess>;
