import type { AutomationStepType } from '../../automations/interfaces/automation-step.interface';

export type AutomationRunStatus =
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'quota_exceeded'
  | 'skipped';

export type AutomationRunStepStatus =
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed'
  | 'skipped'
  | 'waiting';

export interface AutomationRunStep {
  key: string;
  type: AutomationStepType;
  status: AutomationRunStepStatus;
  output: Record<string, unknown> | null;
  error: Record<string, unknown> | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface AutomationRun {
  object: 'automation_run';
  id: string;
  status: AutomationRunStatus;
  status_reason?: string;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  steps: AutomationRunStep[];
}

export type AutomationRunItem = Pick<
  AutomationRun,
  | 'id'
  | 'status'
  | 'status_reason'
  | 'started_at'
  | 'completed_at'
  | 'created_at'
>;
