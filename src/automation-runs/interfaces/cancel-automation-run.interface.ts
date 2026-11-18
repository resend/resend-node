import type { Response } from '../../interfaces';

export interface CancelAutomationRunOptions {
  automationId: string;
  runId: string;
}

export interface CancelAutomationRunResponseSuccess {
  object: 'automation_run';
  id: string;
  status: 'cancelled';
}

export type CancelAutomationRunResponse =
  Response<CancelAutomationRunResponseSuccess>;
