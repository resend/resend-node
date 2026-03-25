import type { Response } from '../../interfaces';
import type { AutomationRunStep } from './automation-run-step';

export interface GetAutomationRunStepOptions {
  automationId: string;
  runId: string;
  stepId: string;
}

export type GetAutomationRunStepResponseSuccess = AutomationRunStep;

export type GetAutomationRunStepResponse =
  Response<GetAutomationRunStepResponseSuccess>;
