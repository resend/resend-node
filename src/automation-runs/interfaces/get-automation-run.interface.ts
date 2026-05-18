import type { Response } from '../../interfaces';
import type { AutomationRun } from './automation-run';

export interface GetAutomationRunOptions {
  automationId: string;
  runId: string;
}

export type GetAutomationRunResponseSuccess = AutomationRun;

export type GetAutomationRunResponse =
  Response<GetAutomationRunResponseSuccess>;
